# React Native Clone App for Uber

## Lesson Outcomes

After implmenting this project, you will have an understanding of:

- React Native core components
- Styling in React Native using StyleSheet components and tailwindcss classnames
- Redux : global state management
- React navigations: concept of screens
- React native elements
- Google API integration
- Patience

### Step 1: Environment Setup

1. Create your expo react native project running the following command.

```
npx create-expo-app uber-clone
```

2. Deploy to your testing environment: physical device through QR code or emulator / simulator

### Step 2: Install and setup redux toolkit

1. Go to redux toolkit [website](https://redux-toolkit.js.org) --> Get Started --> installation --> An existing App

2. For NPM

```
   npm install @reduxjs/toolkit
```

3.  NOTE: If you want to use yarn first install yarn:

```
   npm install --global yarn
```

4.  NOTE: if you have installed yarn before Step 1 then your project will run with yarn and not npm. Note the diff: in NPM, you do npm install packageName
    in YARN you will do yarn add packageName (runs a bit faster)

### Step 3: Setup a Provider for your App

1. We then need to wrap our App inside a component called a Provider. This will help us to connect our App to Redux

2. So lets add the package that will allow us to import the Provider component:

```
   yarn add react-redux
```

3. then in App.js add the following code

```javascript
import { Provider } from "react-redux";
```

```javascript
//Wrap your entire existing App in the Provider component
<Provider>
  <View style={styles.container}>
    <Text>hello world from uber clone!!!</Text>
  </View>
</Provider>
```

4. if you save this your App will break. That is normal. Notice the error msg; It is expecting a store for state management. This is happening because the goal of the Provider is to be able to implement a "data store" a.k.a Redux wrapper and connect it to your App. We don't have that at the moment.

### Step 4: Implement Redux Data Layer (a.k.a store)

1. Redux is a data layer for your App
2. It holds all the data whose state might change and then every component of your APp will communicate with this data layer to send updates to the data and retrieve current state of a data item.

3. First in App.js add a empty store prop to the Provider component

```javascript
   <Provider store={}>
```

4. Next, in the root directory create a file called store.js and we set it up. Click for [usage-documentation](https://redux-toolkit.js.org/usage/usage-guide) and [quick-start](https://redux-toolkit.js.org/tutorials/quick-start). We will use the configureStore template from the documentation, and add a navReducer to it.

```javascript
import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducers";
import navReducer from "./slices/navSlice";

const store = configureStore({
  // reducer: rootReducer,
  reducer: {
    nav: navReducer,
  },
});

export default store;
```

#### Code explanations:

1. configureStore allows to setup the data layer we need
2. navReducer: this will be setup insde a sub-folder called slices in a file called navSlice.js
   1. Essentially you can "slice" up your data layer and store different data context in each. In this example, we will create a single slice of our data layer, calling it navigation slice. The goal of this exercise is to learn that you can slice up your data layer and this is how to do it.
   2. In our slice, we will store user input data for navigation: the source of the ride and the destination of the ride.
3. Setting up the reducer allows you to connect to your slices (when you are trying to push data from any component in your app)
4. create your ./slices folder and navSlice.js file in that folder

5. First import createSlice

```javascript
import { createSlice } from "@reduxjs/toolkit";
```

6. Define and declare your initial state of the data: origin, destination, and time taken to travel from origin to destination

```javascript
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};
```

7. Create your navSlice, give it a name, pass the initial state of the data layer, and add a reducer
   1. reducer explanation again: when you push data into the data layer; we say we are "dispatching" an "action" into the data layer. Actions are basically what you are doing with the data. For example, in this case, the actions will be: {setOrigin, setDestination, setTravelTimeInformation}
   2. Again, when user gives input, say they tell where they want the ride from, we will "dispatch" an "action" into the data layer, basically set the value to the state as given by the user.
   3. All these setup are implemented inside what we call as the reducer.
   4. For setting up actions; you will make a function call. This function will have two parameters: the current state of data represented using the state object, and an action, represented using the action object.
   5. This means when a dispatch is made, the action will be executed, i.e. here the action will be to change the state of the data as input by the users.
   6. The data inside the action object is called "payload"

Code for navSlice.js

```javascript
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducer: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
  },
});
```

- So, when we dispatch setOrigin, it will execute the action with the payload in it. Using this payload we will update the current state of origin.
- Now add two more dispatch in the reducer for the remaining two states: setDestination and setTravelTimeInformation

CODE:

```javascript
export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducer: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});
```

8. Expose the action such that components in your App can use these action we just declared and modify the state.

CODE:

```javascript
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;
```

9. Now we can import these actions into any App components that needs to use it by using the name of the action itself.

10. Setting up selectors
    1. GOAL: a way to PULL the data back from the data store into the Apps (in contrast to what we did above which is to PUSH the data into the data store) is done using Selectors, where you will create one selector for each item in your state.
    2. Don't forget to export your Selectors (like you did for actions) such that other App components can use these selectors.
    3. Side note: remember that you have slice within your data store. So when you select you have to go into this slice (note slice creation and that you have given the slice a name)

CODE:

```javascript
export const selectOrigin = (state) => state.nav.origin;
```

Repeat for destination and travelTimeInformation
CODE:

```javascript
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
```

11. Last step: export the navSlice such that it can be imported into store.js
    CODE:

```javascript
export default navSlice.reducer;
```

12. Notice when we setup the store.js file we had imported:

```javascript
import navReducer from "./slices/navSlice";
```

and in the data store component, we had a reducer:

```javascript
reducer: {
nav: navReducer,
},
```

This is reason why we are exporting navSlice.reducer

13. Now if you go to App.js you can import this store:

CODE ADDITION TO APP.js

```javascript
import store from "./store";
```

and modify Provider component as below:

```javascript
<Provider store={store}>
```

14. If you save everything now, you should see your Hello World screen back again. You have now successfully setup Redux for your App.

### CHECKPOINT:

Self assessment questionnaire (if you can answer these questions, you will have a beginners grasp on working with Redux)

1. What is Redux
2. How do you setup Redux toolkit environment for your React Native Application?
3. What is a Provider and how and where do you set it up?
4. What is a (data) store and how and where do you set it up?
5. What is a data slice and how and where do you set it up?
6. What is a reducer?
   6.1 What is a dispatch, what is an action, what is a payload.
   6.2. How do you modify current state using dispatch of an action within a reducer?
7. How do you expose your action to other App components?
8. What is a selector and how do you set it up and how do you expose your selectors to other App components?

### Step 5: building our first screen - the Homescreen

1. In root directory of your App, create a sub-folder called screens
2. Inside the ./screens folder create a file called HomeScreen.js
   1. If you have ES7-React-ReactNative-Redux extension installed for VSCODE, then you can type in HomeScreen.js: rnefs (stands for react native export functional component with style) and this should create the boiler template.

CODE:

```javascript
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
```

3. Now in App.js remove the code wrapped inside Provider

REMOVE THIS CODE:

```javascript
<View style={styles.container}>
<Text>hello world from uber clone!!!</Text>
{/_ StatusBar is component for navigation area of a phone - dont need it for now _/}
{/_ <StatusBar style="auto" /> _/}
</View>
```

And add the functional component call to HomeScreen
CODE:

```javascript
<HomeScreen />
```

4. You should automatically get the import statement for HomeScreen, if not here is the code:

```javascript
import HomeScreen from "./screens/HomeScreen";
```

5. if you save, you should see the home screen text in your emulator / phone at the top left corner.

6. You will notice the text is in "notch" area of the phone. This is called the "danger area" of your mobile apps.

7. To avoid this, in HomeScreen.js, instead of using the View component, import and use the SafeAreaView component.

   1. If the mobile device does not have a notch (unlike iPhones X and above) SafeAreaView will not do anything. You might face this issue for Android devices; many of them do not have a notch. So we have to address this unfortunately with StyleSheet styling. However, if you are using iOS simulator, simply adding the SafeAreaView instead of View will do the trick.

8. In HomeScreen.js add the following styling:
   CODE:

```javascript
// import this following
import { StatusBar } from "expo-status-bar";

// add the styling for android only
const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
```

```javascript
// incorporate the styling
<SafeAreaView style={styles.AndroidSafeArea}>
  <Text>HomeScreen test once again test</Text>
</SafeAreaView>
```

### STEP 6: Setup styling support with PARTIAL tailwind css classnames (it has the basic most frequently used classnames) used in conjunction with StyleSheet component of react native.

tailwindcss classname packages can be found on this [Link](https://github.com/jaredh159/tailwind-react-native-classnames)

1. add this package to our environment
   terminal cmd:

```
yarn add tailwind-react-native-classnames
```

--> import this package into you App
in HomeScreen.js

//import
import tw from "tailwind-react-native-classnames";

--> Now use it :
<SafeAreaView style={styles.AndroidSafeArea}>
<Text style={tw`text-red-500 p-10`}>HomeScreen test once again test</Text>
</SafeAreaView>

PROG NOTE IMP: note that here we are still using the style prop instead of directly stating className. Also you have to use the tw object that you imported and concatenate that with the tailwindcss class names. For the concatenation, we are using the backtick symbol (not SINGLE QUOTES OR DOUBLE QUOTES) (the key below the ESC key for a regular desktop QWERTY keyboard)

--> if you want to merge this tw classname notation with StyleSheet you will have to pass in an array such as
<Text style={[tw`text-red-500 p-10`, styles.text]}>

Assuming you have declared an text styling in StyleSheets.

--> UPDATE CODE TO INCLUDE tailwind styling
CODE:
const HomeScreen = () => {
return (
<SafeAreaView style={tw`bg-white h-full pt-10`}>
<Text>HomeScreen test once again test 123</Text>
</SafeAreaView>
);
};

---

STEP 7: Start editing the UI content of HomeSreen.js

1. import logo and images
   --> remove all previous content inside component <SafeAreaView>

CODE:
<View style={tw`p-1`}>
<Image
source={require("../assets/Uber-Logo.png")}
style={styles.uberLogo}
/>
</View>

--> I have store my images inside ./assets folder

CODE FOR STYLES:
uberLogo: {
width: 100,
height: 100,
resizeMode: "contain",
},

---

Step 8: Setting up React Navigation

2. Setup navigation options for the APp such as book a ride and say use uber eats etc.

--> create a new folder insider the root directory called "components"; this will contain our reusable components

--> inside ./components create a file called "NavOptions.js". We will use this to show reusable card components on the UI (recall our Airbnb exercise). Create boiler template using rnfe snippet
CODE:
import { View, Text } from "react-native";
import React from "react";

const NavOptions = () => {
return (
<View>
<Text>NavOptions</Text>
</View>
);
};

export default NavOptions;

--> Go back to HomeScreen.js, and under <Image ... /> component, add the <NavOptions />

//import
import NavOptions from "../components/NavOptions";

UPDATED CODE:
<View style={tw`p-1`}>
<Image
source={require("../assets/Uber-Logo.png")}
style={styles.uberLogo}
/>

        <NavOptions />
      </View>

--> Add the following data array to your NavOptions.js file right below the import statements
CODE:
const data = [
{
id: "123",
title: "Get a ride",
image: require("../assets/UberX.webp"),
screen: "MapScreen",
},
{
id: "456",
title: "Order Food",
image: require("../assets/Uber-Eats-Logo.png"),
screen: "EatsScreen", // Finish as self exercise
},
];

--> We will use this as props to render out our navigation options on the UI. the screen essentially states that once that nav option is clicked, which screen UI will render and we will implement this in a short while using react navigation.

--> the <FlatList> component of React native (https://reactnative.dev/docs/flatlist)

REmove the following code in NavOptions.js
REMOVE CODE:
<View>
<Text> I am the NavOptions</Text>
</View>

ADD CODE:
<FlatList
data={navData}
horizontal
keyExtractor={(item) => item.id}
renderItem={({ item }) => (
<TouchableOpacity>
<Text>{item.title}</Text>
</TouchableOpacity>
)}
/>

-> data prop is the source of the data which is the array that we created. horizontal is bool value that determines whether the list items will be rendered horizontally (if you don't include horizontal, default list view is vertical). keyExtractors sets the unique key for each item in the data such that react can distinguish between them and if any changes take place then react knows which item to re-render instead of re-rendering the whole UI. renderItem method takes the data and renders each item on the UI. The <TouchableOpacity> core components give the touch screen feedback look on the items rendered in UI.

--> Add images and icon along with the text to navigation options instead of simply rendering a Text
REMOVE CODE:
<Text>{item.title}</Text>

ADD CODE:
<View>
<Image
style={{ width: 150, height: 150, resizeMode: "contain" }}
source={item.image}
/>
<Text>{item.title}</Text>
</View>

--> ADD some more overall styling (only add the style):
CODE:
<TouchableOpacity style={tw`pl-2 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
<View>
<Image
style={{ width: 150, height: 150, resizeMode: "contain" }}
source={item.image}
/>
<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
</View>
</TouchableOpacity>

---

--> ADD AN ICON to navigation using REACT NATIVE ELEMENTS (3rd party [material UI] theme provider for various react native components)

1. Goto: https://reactnativeelements.com/ and click get started

2. terminal cmd:
   yarn add react-native-elements
   yarn add react-native-vector-icons
   yarn add react-native-safe-area-context

the last one will prevent the icons from bleeding into dangerous area. we need import this obj into App.js and wrap our entire app.

3. Goto App.js and wrap your entire App as follows:

//import
import { SafeAreaProvider } from 'react-native-safe-area-context'

CODE:
<Provider store={store}>
<SafeAreaProvider>
<HomeScreen />
</SafeAreaProvider>
</Provider>

4. Go back to NavOptions.js to add your icon:
   https://reactnativeelements.com/docs/components/icon#available-icon-sets

CODe:
//import
import { Icon } from "react-native-elements";

//code: (right below <Text> that is inside <View> of parent component <TouchableOpacity>)
<Icon name="arrowright" color="white" type="antdesign" />

5. Style your Icon
   CODE:
   <Icon
   style={tw`p-2 bg-black rounded-full w-10 mt-4`}
   name="arrowright"
   color="white"
   type="antdesign"
   />

---

--> Click on icon to goto next screen.
Notice in the data array in NavOptions.js, we have an key called screen for each data item in the array. Our goal now is to goto this screen when user touches the nav options

--> In ./screens create a new screen called MapScreen.js
--> create boiler template using rnfe
CODE:
import { View, Text } from "react-native";
import React from "react";

const MapScreen = () => {
return (
<View>
<Text>MapScreen</Text>
</View>
);
};

export default MapScreen;

--> Open the following:
https://reactnative.dev/docs/navigation

--> Packge to be used: https://reactnavigation.org/

--> Add this to your environment
terminal cmd: yarn add @react-navigation/native
terminal cmd:
npx expo install react-native-screens react-native-safe-area-context

--> Wrap your App in the NavigationContainer for React navigation to be incorporated into your App

//import
import { NavigationContainer } from '@react-navigation/native';

CODE UPDATE:
<Provider store={store}>
<NavigationContainer>
<SafeAreaProvider>
<HomeScreen />
</SafeAreaProvider>
</NavigationContainer>
</Provider>

--> Implementing the react navigation
goto: https://reactnavigation.org/docs/hello-react-navigation

terminal cmd: yarn add @react-navigation/native-stack

note: if you hit an error, stop your server first.

--> Stack is what will enable the mobile app navigation. All screens of a mobile app are presented as if they are stored in a Stack data structure. When you goto a new screen it gets stacked (pushed/layered) on top of the current screen and when you navigate back to a previous screen, the current screen gets popped.

//import in App.js:
import { createNativeStackNavigator } from '@react-navigation/native-stack';

--> Next inside export default function App(){} body before the return() statement add the following
CODE:
const Stack = createNativeStackNavigator();

--> Now inside the <SafeAreaProvider> component add the following components that will wrap all your App screens:

CODE:
<Stack.Navigator>
<Stack.Screen
name="HomeScreen"
component={HomeScreen}
options={{ headerShown: false }}
/>
</Stack.Navigator>
{/_ <HomeScreen /> _/}

--> Now lets add another screen called the MapScreen right after the above code
CODE:
<Stack.Navigator>
<Stack.Screen
name="HomeScreen"
component={HomeScreen}
options={{ headerShown: false }}
/>
<Stack.Screen
name="MapScreen"
component={MapScreen}
options={{ headerShown: false }}
/>
</Stack.Navigator>

--> don't forget to import MapScreen component into App.js

--> Now when users click or touch on get a ride we want to navigate to the MapScreen. We will implement this using a Hook called useNavigation() [https://reactnavigation.org/docs/use-navigation/]

--> We will implement this in NavOptions.js file where the <touchableOpacity> component gets rendered.

--> import the following
//import
import { useNavigation } from "@react-navigation/native";

--> declare your hook inside the functional component of NavOptions

CODE:
const navigation = useNavigation();

--> add event listener to <TouchableOpacity> and connect it to navigation hook object previously declared.

CODE: [just add the event listener part]
<TouchableOpacity
onPress={() => navigation.navigate(item.screen)}
style={tw`pl-2 pb-8 pt-4 bg-gray-200 m-2 w-40`} >

--> take a moment to appreciate the little big thing that has been achieved.

CHECKPOINT:

1. What is react navigation how do you implment it in your App
2. What are react native elements how to do you implement it in your app.

---

STEP 8: Google APIs

1. Goto link:
   https://github.com/FaridSafi/react-native-google-places-autocomplete

2. Add the package to your environment
   terminal cmd:
   yarn add react-native-google-places-autocomplete

3. Get Google API keys for these google APIs

--> NOTE: you need to enable billing on Google Cloud Platform for this. Note that there is a free quota of usage. If you query your APIs (google places, google maps, google distance matrix) over the free quota you will charged to your credit card. For testing and development purposes, you generally will not exceed the free quota.

--> Goto link: https://cloud.google.com/
--> sign in with your preferred gmail account. Use your personal gmail account and not your oakland.edu account.
--> From top right corner, click on the button called "Console"
--> IF you are using this for the first time, you need to find and click on new project
--> If you have used this before, you will probably see some old project. From top left corner, see where it says Google Cloud, to the right of it, you will see the project name. Click on that.
--> It will open a select a project window
--> click on "New Project" button to the top right corner of this new window.
--> follow the prompts and finish the project setup.
--> once project is created make sure to select this project (if you have other projects).
--> click on the hamburger menu icon on top left
--> Click on API and Services (or click it from the quick access menu)
--> Notice right below the search bar in the top center location of the window, there is an option called Enable APIS AND SERVICES. click on that.
--> in the search bar of this new page, search for the following APIs:

- Directions API (click on the result and click on Enable button)

--> after you enable this, it will take you back to a page where there will be two sections: enabled APIs and Additional APIs.

--> From Additional API section enable the following APIs

- Places API
- Distance Matrix API

NOTE: make sure you are in the right project folder.

---

ENABLE BILLING (otherwise these APIs wont work)

-> click on the hamburger menu icon top left
-> click billing
-> click LINK A BILLING ACCOUNT
-> click CREATE BILLING ACCOUNT
-> fill out prompts, agree to T&C, click CONTINUE
-> change account type to individual
-> Add your credit/debit card infomartion
-> Click on START MY FREE TRIAL
-> finish off the rest of the prompts

Free trial will be for 90 days and you will get $300 worth usage (thats A LOT). You won't be charged after free trial ends unless you manually upgrade to a paid account so don't worry.

---

API Credentials / API Keys [SENSITIVE; Do Not Share unless you want to]

-> go back to API and Services - enabled APIs from the hamburger menu.
-> In this window on the left vertical look for "Credentials"
-> For a fresh start, you will see no Keys
-> See on the screen top center below the search bar the button "CREATE CREDENTIALS". click on it.
-> Select "API Key" from the drop down menu
-> Save your API key somewhere safe. This key will allow you to access all the APIs that you enabled right now.
-> side note: once the key is created from the dashboard you can edit the key and add restrictions to it like this key can be used only from an android app or iOS app etc.

---

Setup your API key in your App

-> go back to VSCode
-> on the root level, create file called ".env"
-> make sure you put ".env" in the .gitignore file so you don't accidentally push your key to github and expose it.
-> IN THE .env file write the following:
GOOGLE_MAPS_APIKEY=y0UrK3yt4htyOucReated

---

Setup your project such that it can use env variables.

-> Add the following package
terminal cmd: yarn add react-native-dotenv

-> Open your file called 'babel.config.js'
add the following lines of code right after the presets item

CODE:
plugins: [
[
"module:react-native-dotenv",
{
moduleName: "@env",
path: ".env",
},
],
],

---

1. From this package: https://github.com/FaridSafi/react-native-google-places-autocomplete

We will add the google-places-autocomplete to our HomeScreen.js file. This will allow users to search for source and destinations.

2. Add the following code to HomeScreen.js

//import
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import google api key (this is my env variable name, you will use yours.)
import { GOOGLE_MAPS_API_KEY } from "@env"

-> side note: notice in babel config, we have given an alias module name for the package react-native-dotenv

// add the component RIGHT BEFORE THE <NavOptions /> component

CODE:
<GooglePlacesAutocomplete
placeholder="Start Location"
styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
// including the places search api
nearbyPlacesAPI="GooglePlacesSearch"
// google will show suggestion after user has stopped typing and waits 400ms
debounce={400}
minLength={2}
enablePoweredByContainer={false}
// Query Google to search and give suggestion to user
query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
onPress={(data, details = null) => {
console.log(data);
console.log(details);
}}
fetchDetails={true}
returnKeyType={"search"}
/>

Next Steps: get this data use a dispatch and update the state of origin in the data store's navSlice

```

```
