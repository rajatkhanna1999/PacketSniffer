# PacketSniffer
Packet Sniffer: 
It Sniffs the packets travelling in the network and Web GUI is made using eel library and a Python backend.

![](ui_sample1.png)
![](ui_sample2.png)
![](ui_sample3.png)

## Getting Started
- Clone the repo and cd into the directory
```sh
$ git clone https://github.com/rajatkhanna1999/PacketSniffer.git
$ cd PacketSniffer
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

#### Screenshots
<img src="https://user-images.githubusercontent.com/31288037/57392932-ab792600-71df-11e9-8e80-d2f2a8f961be.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57392863-7f5da500-71df-11e9-98e6-da552445660e.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57392973-c055b980-71df-11e9-9f3c-164af77e50c8.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57393024-da8f9780-71df-11e9-8117-2f3ca118c7ac.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57393232-4d990e00-71e0-11e9-9b74-1623bcaf56ef.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57393254-5a1d6680-71e0-11e9-9db9-6d2d05666979.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57393270-630e3800-71e0-11e9-8470-6cad0c835967.jpeg" width="340" height="567">
<img src="https://user-images.githubusercontent.com/31288037/57393690-3eff2680-71e1-11e9-8263-3cb6987dfa6e.jpeg" width="340" height="567">
