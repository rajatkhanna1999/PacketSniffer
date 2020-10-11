import socket
from struct import *
import datetime
import pcapy
import sys
import re
def main(argv):
	devices = pcapy.findalldevs()
	print (devices)
	
	print ('Available devices are :')
	for d in devices :
		print (d)
	
	dev = input('Enter device name to sniff : ')
	
	print ('Sniffing device ' , dev)
	socket.setdefaulttimeout(2)
	s = socket.socket();
	cap = pcapy.open_live(dev , 65536 , 1 , 2)
	filt='htt'
	if filt=='http':
		cap.setfilter('tcp port 80')
	elif filt=='tcp':
		cap.setfilter('tcp')
	elif filt=='udp':
		cap.setfilter('udp')
	elif filt=='icmp':
		cap.setfilter('icmp')
	while(1) :
		(header, packet) = cap.next()
		#print ('%s: captured %d bytes, truncated to %d bytes' %(datetime.datetime.now(), header.getlen(), header.getcaplen()))
		parse_packet(packet)


def eth_addr (a) :
	b = "%.2x:%.2x:%.2x:%.2x:%.2x:%.2x" % (ord(a[0]) , ord(a[1]) , ord(a[2]), ord(a[3]), ord(a[4]) , ord(a[5]))
	return b

def parse_packet(packet) :
	
	eth_length = 14
	
	eth_header = packet[:eth_length]
	eth = unpack('!6s6sH' , eth_header)
	eth_protocol = socket.ntohs(eth[2])
	print ('Destination MAC : ' , eth_addr(str(packet[0:6])) , ' Source MAC : ' , eth_addr(str(packet[6:12])) , ' Protocol : ' , str(eth_protocol))

	if eth_protocol == 8 :
		ip_header = packet[eth_length:20+eth_length]
		
		iph = unpack('!BBHHHBBH4s4s' , ip_header)

		version_ihl = iph[0]
		version = version_ihl >> 4
		ihl = version_ihl & 0xF

		iph_length = ihl * 4

		ttl = iph[5]
		protocol = iph[6]
		s_addr = socket.inet_ntoa(iph[8]);
		d_addr = socket.inet_ntoa(iph[9]);

		print ('Version : ' , str(version) , ' IP Header Length : ' , str(ihl) , ' TTL : ' , str(ttl) , ' Protocol : ' , str(protocol) , ' Source Address : ' , str(s_addr) , ' Destination Address : ' , str(d_addr))

		#TCP protocol
		if protocol == 6 :
			t = iph_length + eth_length
			tcp_header = packet[t:t+20]

			#now unpack them :)
			tcph = unpack('!HHLLBBHHH' , tcp_header)
			
			source_port = tcph[0]
			dest_port = tcph[1]
			sequence = tcph[2]
			acknowledgement = tcph[3]
			doff_reserved = tcph[4]
			tcph_length = doff_reserved >> 4
			
			print ('Source Port : ' , str(source_port) , ' Dest Port : ' , str(dest_port) , ' Sequence Number : ' , str(sequence) , ' Acknowledgement : ' , str(acknowledgement) , ' TCP header length : ' , str(tcph_length))
			
			h_size = eth_length + iph_length + tcph_length * 4
			data_size = len(packet) - h_size
			
			#get data from the packet
			data = packet[h_size:]
			data = data.decode('utf8','ignore')
			x = re.search("[pP][aA][Ss][Ss][wW][oO][rR][dD]", data)
			y = re.search("[Cc][Oo][Oo][Kk][iI][Ee]", data)
			print ('Data : ' , data)
			if (x):
				print ('Kewyord Found Password : ',x,'\n')
			if (y):
				print ('Kewyord Found Cookie : ',y,'\n')

		#ICMP Packets
		elif protocol == 1 :
			u = iph_length + eth_length
			icmph_length = 4
			icmp_header = packet[u:u+4]

			#now unpack them :)
			icmph = unpack('!BBH' , icmp_header)
			
			icmp_type = icmph[0]
			code = icmph[1]
			checksum = icmph[2]
			
			print ('Type : ' , str(icmp_type) , ' Code : ' , str(code) , ' Checksum : ' , str(checksum))
			
			h_size = eth_length + iph_length + icmph_length
			data_size = len(packet) - h_size
			
			#get data from the packet
			data = packet[h_size:]
			data = data.decode('utf8','ignore')
			print ('Data : ' , data,'\n')

		#UDP packets
		elif protocol == 17 :
			u = iph_length + eth_length
			udph_length = 8
			udp_header = packet[u:u+8]

			#now unpack them :)
			udph = unpack('!HHHH' , udp_header)
			
			source_port = udph[0]
			dest_port = udph[1]
			length = udph[2]
			checksum = udph[3]
			
			print ('Source Port : ' , str(source_port) , ' Dest Port : ' , str(dest_port) , ' Length : ' , str(length) , ' Checksum : ' , str(checksum))
			
			h_size = eth_length + iph_length + udph_length
			data_size = len(packet) - h_size
			
			#get data from the packet
			data = packet[h_size:]
			data = data.decode('utf8','ignore')
			x = re.search("[pP][aA][Ss][Ss][wW][oO][rR][dD]", data)
			y = re.search("[Cc][Oo][Oo][Kk][iI][Ee]", data)
			print ('Data : ' , data)
			if (x):
				print ('Kewyord Found Password : ',x,'\n')
			if (y):
				print ('Kewyord Found Cookie : ',y,'\n')

		#some other IP packet like IGMP
		else :
			print ('Protocol other than TCP/UDP/ICMP \n')
			
		print

if __name__ == "__main__":
	main(sys.argv)
