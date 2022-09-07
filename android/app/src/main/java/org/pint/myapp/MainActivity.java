package org.myshout.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import ch.byrds.capacitor.contacts.Contacts;
import com.baumblatt.capacitor.firebase.auth.CapacitorFirebaseAuth;

public class MainActivity extends BridgeActivity {
  @Override
       public void onCreate(Bundle savedInstanceState) {
           super.onCreate(savedInstanceState);
           // registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
			registerPlugin(Contacts.class);
			registerPlugin(CapacitorFirebaseAuth.class);

           /* // Initializes the Bridge
           this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
             // Additional plugins you've installed go here
             // Ex: add(TotallyAwesomePlugin.class);
             add(Contacts.class);
           }}); */
       }
}
