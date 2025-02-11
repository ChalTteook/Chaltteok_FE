package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

<<<<<<< HEAD
// @mj-studio/react-native-naver-map
import com.mjstudio.reactnativenavermap.RNCNaverMapPackage;
// @react-native-community/datetimepicker
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
// @react-native-cookies/cookies
import com.reactnativecommunity.cookies.CookieManagerPackage;
=======
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1
// expo
import expo.modules.ExpoModulesPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-get-random-values
import org.linusu.RNGetRandomValuesPackage;
<<<<<<< HEAD
// react-native-maps
import com.rnmaps.maps.MapsPackage;
=======
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
<<<<<<< HEAD
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
=======
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
<<<<<<< HEAD
      new RNCNaverMapPackage(),
      new RNDateTimePickerPackage(),
      new CookieManagerPackage(),
      new ExpoModulesPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new MapsPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SvgPackage(),
      new VectorIconsPackage(),
      new RNCWebViewPackage()
=======
      new ExpoModulesPackage(),
      new RNGestureHandlerPackage(),
      new RNGetRandomValuesPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new SvgPackage(),
      new VectorIconsPackage()
>>>>>>> ded217b60f603344aab12e2f7fe0edcc4d4059f1
    ));
  }
}