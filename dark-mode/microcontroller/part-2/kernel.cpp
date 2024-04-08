// This code is derived from work done by the Circle project (see description below).
//
// kernel.cpp
//
// Circle - A C++ bare metal environment for Raspberry Pi
// Copyright (C) 2014-2018  R. Stange <rsta2@o2online.de>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
#include "kernel.h"
#include <circle/string.h>

#include <circle/sched/task.h>
#include <circle/net/in.h>
#include <circle/net/socket.h>
#include <circle/net/ipaddress.h>

static const char FromKernel[] = "kernel";

CActLED CKernel::ActLED; // initialize built-in LED (if available)
bool flag;

// Assuming pNetSubSystem is an instance of CNetSubSystem
u8 pIPAddress[] = {169,254,104,16}; // IP address
u8 pNetMask[] = {255, 255, 0, 0};

u8 pDefaultGateway[] = {8, 8, 8, 8};
u8 pDNSServer[] = {8, 8, 8, 8};

const char* pHostname = "MyDevice";


//const char* darkModeToggleURL = "http://169.254.104.16:8080/dark-mode/toggle";

CKernel::CKernel (void)
:	m_Screen (m_Options.GetWidth (), m_Options.GetHeight ()),
	m_Timer (&m_Interrupt),
	m_Logger (m_Options.GetLogLevel (), &m_Timer),
	m_GPIOManager (&m_Interrupt), 		// set up GPIO manager

	m_GPIO18 (18, GPIOModeOutput),
     m_USBHCI (&m_Interrupt, &m_Timer),
     m_Net(pIPAddress, pNetMask, pDefaultGateway, pDNSServer, pHostname, NetDeviceTypeEthernet)

{
	ActLED.Blink (5);		// show we are alive
	//initialize LED as off
    flag = false;

}

CKernel::~CKernel (void)
{
}

boolean CKernel::Initialize (void)
{
	boolean bOK = TRUE;

	if (bOK)
	{
		bOK = m_Screen.Initialize ();
	}

	if (bOK)
	{
		bOK = m_Serial.Initialize (115200);
	}

	if (bOK)
	{
		CDevice *pTarget = m_DeviceNameService.GetDevice (m_Options.GetLogDevice (), FALSE);
		if (pTarget == 0)
		{
			pTarget = &m_Screen;
		}

		bOK = m_Logger.Initialize (pTarget);
	}

	if (bOK)
	{
		bOK = m_Interrupt.Initialize ();
	}

	if (bOK)
	{
		bOK = m_Timer.Initialize ();
	}

	if (bOK)
	{
		bOK = m_GPIOManager.Initialize ();
	}

	if (bOK)
	{
		bOK = m_USBHCI.Initialize ();
	}

	// Uncomment this for TCP-related functionalities
	if (bOK)
	{
	    bOK = m_Net.Initialize ();
	}

    if(bOK)
    {
        bOK = m_Client.Initialize();
    }

	return bOK;
}

TShutdownMode CKernel::Run (void)
{
	// Write to console
	m_Logger.Write (FromKernel, LogNotice, "Compile time: " __DATE__ " " __TIME__);

	// Get IP Config - Uncomment these lines for TCP-related functionalities
    CString IPString;
    m_Net.GetConfig ()->GetIPAddress ()->Format (&IPString);
    m_Logger.Write (FromKernel, LogNotice, IPString);


	m_Logger.Write (FromKernel, LogNotice, "Network config starting up.");

	// Set up GPIO pin interrupt
	unsigned int myPin = 17;
	CGPIOPin myInputPin (myPin, GPIOModeInput, &m_GPIOManager);


	// What do these two lines of code do?
	myInputPin.ConnectInterrupt (foo, this);
	myInputPin.EnableInterrupt (GPIOInterruptOnFallingEdge);

	m_Logger.Write (FromKernel, LogNotice, "Pin interrupt configured.");


	while (1)
	{

		// Write status message
		//m_Logger.Write (FromKernel, LogNotice, "In Loop.");	// uncomment later

        // If flag set to true, execute
        if(flag) {

			m_Logger.Write(FromKernel, LogNotice, "FLAG IS TRUE");

			// New socket object
			CSocket *pSocket2 = new CSocket(&m_Net, IPPROTO_TCP);

			u8 TargetIPArray2[] = {34,125,30,158}; // GCP instance IP address
			CIPAddress ForeignIP2(TargetIPArray2);
			u16 nForeignPort2 = 8080;

			// Connect to target
			pSocket2->Connect(ForeignIP2, nForeignPort2);

			// Send HTTP request
			CString request("GET /dark-mode/toggle HTTP/1.1\r\nHost: 34.125.30.158:8080\r\n\r\n");
			unsigned requestLength = request.GetLength();
			pSocket2->Send(request, requestLength, MSG_DONTWAIT);

			// Close connection
			delete pSocket2;

			// Blink LED
			m_GPIO18.Write(HIGH);
			m_Timer.MsDelay(200);
			m_GPIO18.Write(LOW);

			// Reset flag
			flag = false;
		}


	}

	return ShutdownHalt;
}

void foo ( void *pParam )
{

	CKernel *pThis = (CKernel *) pParam;
	pThis->myInterruptHandler();

}

void CKernel::myInterruptHandler ()
{

	m_Logger.Write (FromKernel, LogNotice, "Entered Interrupt.");

    flag = true; // Added
}
