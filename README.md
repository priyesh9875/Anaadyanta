# Anaadyanta
App for Anaadyanta 2017

## Tested on Android 5, 6, 7 real and emulator. iOS 10.2 simulator
## Run project
```
git clone https://github.com/priyesh9875/Anaadyanta.git

cd Anaadyanta

npm i

react-native run-android && react-native start
```

Note: Edit app/config/firebase and add your firebase credentials before running `react-native` commands


## Note for iOS build
We haven't tested notification on iOS device as it requires apple dev account. So before building for iOS, make sure to unlink `react-native-fcm` and remove all instance of `react-native-fcm` from the source code
