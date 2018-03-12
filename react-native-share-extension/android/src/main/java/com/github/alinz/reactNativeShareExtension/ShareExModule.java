package com.github.alinz.reactNativeShareExtension;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.alinz.parkerdan.shareextension.RealPathUtil;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import javax.annotation.Nullable;

import static android.content.ContentValues.TAG;

public class ShareExModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    public ShareExModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);
    }

    public String getName() {
        return "ReactNativeShareExtension";
    }

    @ReactMethod
    public void data(Promise promise) {
        promise.resolve(processIntent());
    }

    protected WritableMap processIntent() {

        Activity currentActivity = getCurrentActivity();

        WritableMap map = Arguments.createMap();

        Intent intent = currentActivity.getIntent();
        String action = intent.getAction();
        String type = intent.getType();
        String value = "";

        Log.d(TAG, "Content Value Here : " + "---" + action + "--Type--" + type);

        if (type == null) {
            type = "";
        }

        //if you want to support more, just add more things here.
        //at the moment we are only supporting browser URL
        if (Intent.ACTION_SEND.equals(action) && "text/plain".equals(type)) {
            value = intent.getStringExtra(Intent.EXTRA_TEXT);
        } else if (Intent.ACTION_SEND.equals(action) && ("image/*".equals(type) || "image/jpeg".equals(type) || "image/png".equals(type) || "image/jpg".equals(type))) {
            Uri uri = (Uri) intent.getParcelableExtra(Intent.EXTRA_STREAM);
            value = "file://" + RealPathUtil.getRealPathFromURI(currentActivity, uri);
        }

        map.putString("type", type);
        map.putString("value", value);

        return map;
    }

    @ReactMethod
    public void close() {
        Activity currentActivity = getCurrentActivity();

        currentActivity.finish();
    }

    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
    }

    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
    }

    public void onNewIntent(Intent intent) {
    }
}
