package com.test;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import java.util.function.Function;
import android.content.Intent;
import android.net.Uri;

import android.util.Log;

public class CustomModule extends ReactContextBaseJavaModule {
   CustomModule(ReactApplicationContext context) {
       super(context);
   }

    @NonNull
    @Override
    public String getName() {
        return "CustomModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location) {
        Log.d("CustomModule", "Create event called with name: " + name
        + " and location: " + location);
    }

    @ReactMethod
    public void sum(int a, int b, Callback callback) {
        callback.invoke(a+b);
    }

    @ReactMethod
    void dialNumber(String number) {
        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
        getReactApplicationContext().startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
    }

    @ReactMethod
    public void navigateToNative(){
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, App.class);

        if (intent.resolveActivity(context.getPackageManager()) != null) {
            intent.setFlags((Intent.FLAG_ACTIVITY_NEW_TASK));
            context.startActivity(intent);
        }
    }
}