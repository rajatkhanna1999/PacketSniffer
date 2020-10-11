# PacketSniffer
Packet Sniffer
It Sniffs the packets present in the network and GUI is mage using eel library.

## Getting Started
- Clone the repo and cd into the directory
```sh
$ git clone git@github.com:SouravJohar/getting-started-with-eel.git
$ cd getting-started-with-eel
```

- Install eel, and pyinstaller

```sh
$ pip install eel pyinstaller pypng
```

- Run the app

```sh
$ sudo python PacketSniffer.py
```

## Packaging the app
You can pass any valid `pyinstaller` flag in the following command to further customize the way your app is built.
```sh
$ python -m eel PacketSniffer.py web --noconsole --onefile --icon=barcode.icns
```
