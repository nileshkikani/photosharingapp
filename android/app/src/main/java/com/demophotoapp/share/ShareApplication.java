// import your package
package com.demophotoapp.share;

import com.alinz.parkerdan.shareextension.SharePackage;

import android.app.Application;

import com.demophotoapp.BuildConfig;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactPackage;

import java.util.Arrays;
import java.util.List;


public class ShareApplication extends Application implements ReactApplication {

 private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

   @Override
   public boolean getUseDeveloperSupport() {
     return BuildConfig.DEBUG;

   }

   @Override
   protected List<ReactPackage> getPackages() {
     return Arrays.<ReactPackage>asList(
         new MainReactPackage(),
         new SharePackage()
     );
   }
 };

 @Override
 public ReactNativeHost getReactNativeHost() {
     return mReactNativeHost;
 }
}
