keytool -genkey -v -keystore wms-rn-key.keystore -alias 3pl-wms-rn -keyalg RSA -keysize 2048 -validity 10000

Setting up gradle variables
Place the my-release-key.keystore file under the android/app directory in your project folder.
Edit the file ~/.gradle/gradle.properties or android/gradle.properties and add the following (replace ***** with the correct keystore password, alias and key password),

MYAPP_RELEASE_STORE_FILE=photodemo
MYAPP_RELEASE_KEY_ALIAS=photodemo
MYAPP_RELEASE_STORE_PASSWORD=123456
MYAPP_RELEASE_KEY_PASSWORD=123456

Edit the file android/app/build.gradle in your project folder and add the signing config,

...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...

cd android && ./gradlew assembleRelease && cd .. && adb install android/app/build/outputs/apk/app-release.apk

adb install android/app/build/outputs/apk/app-release.apk

cp android/app/build/outputs/apk/app-release.apk ~/Desktop/wms-rb1.0.apk


//---- If remove node_modules

after npm install
    react-native link react-native-fcm
