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
  reducers: {
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

```
yarn add tailwind-react-native-classnames
```

2. import this package into your App in HomeScreen.js

```javascript
//import
import tw from "tailwind-react-native-classnames";
```

Now use it:

```javascript
<SafeAreaView style={styles.AndroidSafeArea}>
  <Text style={tw`text-red-500 p-10`}>HomeScreen test once again test</Text>
</SafeAreaView>
```

3. PROG NOTE IMP: note that here we are still using the style prop instead of directly stating className. Also you have to use the tw object that you imported and concatenate that with the tailwindcss class names. For the concatenation, we are using the backtick symbol (not SINGLE QUOTES OR DOUBLE QUOTES) (the key below the ESC key for a regular desktop QWERTY keyboard)

4. if you want to merge this tw classname notation with StyleSheet (Assuming you have declared an text styling in StyleSheets) you will have to pass in an array such as:

```javascript
<Text style={[tw`text-red-500 p-10`, styles.text]}>
```

5. UPDATE CODE TO INCLUDE some tailwind styling
   CODE:

```javascript
const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full pt-10`}>
      <Text>HomeScreen test once again test 123</Text>
    </SafeAreaView>
  );
};
```

### STEP 7: Start editing the UI content of HomeSreen.js

1. import logo and images (remove all previous content inside component SafeAreaView>

CODE:

```javascript
<View style={tw`p-1`}>
  <Image source={require("../assets/Uber-Logo.png")} style={styles.uberLogo} />
</View>
```

I have saved my images inside ./assets folder

CODE FOR STYLES:

```javascript
uberLogo: {
width: 100,
height: 100,
resizeMode: "contain",
},
```

### Step 8: Setting up React Navigation

1. Setup navigation options for the APp such as book a ride and say use uber eats etc.

2. Create a new folder insider the root directory called "components". this will contain our reusable components.

3. inside ./components create a file called "NavOptions.js". We will use this to show reusable card components on the UI (recall our Airbnb exercise). Create boiler template using rnfe snippet

CODE:

```javascript
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
```

4. Go back to HomeScreen.js, and under Image component, add the NavOptions component

CODE:

```javascript
//import
import NavOptions from "../components/NavOptions";

//UPDATED CODE:
<View style={tw`p-1`}>
  <Image source={require("../assets/Uber-Logo.png")} style={styles.uberLogo} />

  <NavOptions />
</View>;
```

5. Add the following data array to your NavOptions.js file right below all the import statements

CODE:

```javascript
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
```

6. We will use this as props to render out our navigation options on the UI. the screen essentially states that once that nav option is clicked, which screen the UI will render and we will implement this in a short while using react navigation.

7. We will render the array items using the FlatList core component of React native (https://reactnative.dev/docs/flatlist)

Remove the following code in NavOptions.js.
REMOVE CODE:

```javascript
<View>
  <Text> I am the NavOptions</Text>
</View>
```

ADD CODE:

```javascript
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
```

#### Code explanation:

- data prop is the source of the data which is the array that we created.
- horizontal is bool value that determines whether the list items will be rendered horizontally (if you don't include horizontal, default list view is vertical).
- keyExtractors sets the unique key for each item in the data such that react can distinguish between them and if any changes take place then react knows which item to re-render instead of re-rendering the whole UI.
- renderItem method takes the data and renders each item on the UI.
- The TouchableOpacity core components give the touch screen feedback look on the items rendered in UI.

9. Add images and icon along with the text to navigation options instead of simply rendering a Text

REMOVE CODE:

```javascript
<Text>{item.title}</Text>
```

ADD CODE:

```javascript
<View>
  <Image
    style={{ width: 150, height: 150, resizeMode: "contain" }}
    source={item.image}
  />
  <Text>{item.title}</Text>
</View>
```

ADD some more overall styling (only add the style):

CODE:

```javascript
<TouchableOpacity style={tw`pl-2 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
  <View>
    <Image
      style={{ width: 150, height: 150, resizeMode: "contain" }}
      source={item.image}
    />
    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
  </View>
</TouchableOpacity>
```

### Step 9: React native Elements

1. ADD AN ICON to navigation using REACT NATIVE ELEMENTS (3rd party [material UI] theme provider for various react native components)
2. Goto: https://reactnativeelements.com/ and click get started

3. Add the packages:

```
   yarn add react-native-elements
   yarn add react-native-vector-icons
   yarn add react-native-safe-area-context
```

the last one will prevent the icons from bleeding into dangerous area. we need import this obj into App.js and wrap our entire app.

4. Goto App.js and wrap your entire App as follows:

CODE:

```javascript
//import
import { SafeAreaProvider } from "react-native-safe-area-context";

// CODE:
<Provider store={store}>
  <SafeAreaProvider>
    <HomeScreen />
  </SafeAreaProvider>
</Provider>;
```

5. Go back to NavOptions.js to add your icon. See this site for [documentation](https://reactnativeelements.com/docs/components/icon#available-icon-sets)

CODE:

```javascript
//import
import { Icon } from "react-native-elements";

//code: (right below <Text> that is inside <View> of parent component <TouchableOpacity>)
<Icon name="arrowright" color="white" type="antdesign" />;
```

6. Style your Icon

CODE:

```javascript
<Icon
  style={tw`p-2 bg-black rounded-full w-10 mt-4`}
  name="arrowright"
  color="white"
  type="antdesign"
/>
```

7. Click on icon to goto next screen. Notice in the data array in NavOptions.js, we have an key called screen for each data item in the array. Our goal now is to goto this screen when user touches/clicks the nav options

8. In ./screens create a new screen called MapScreen.js

9. create boiler template using rnfe
   CODE:

```javascript
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
```

10. Open the following for reference: https://reactnative.dev/docs/navigation

11. Package to be used: https://reactnavigation.org/

12. Add this package to your environment

```
yarn add @react-navigation/native
```

13. Then add these Expo packages

```
npx expo install react-native-screens react-native-safe-area-context
```

14. Wrap your App in the NavigationContainer component for React navigation to be incorporated into your App

CODE:

```javascript
//import
import { NavigationContainer } from "@react-navigation/native";

// CODE UPDATE:
<Provider store={store}>
  <NavigationContainer>
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  </NavigationContainer>
</Provider>;
```

15. Implementing the react navigation (reference: https://reactnavigation.org/docs/hello-react-navigation)

Add the package

```
yarn add @react-navigation/native-stack
```

note: if you hit an error, stop your server first.

15. Stack is what will enable the mobile app navigation. All screens of a mobile app are presented as if they are stored in a Stack data structure. When you goto a new screen it gets stacked (pushed/layered) on top of the current screen and when you navigate back to a previous screen, the current screen gets popped.

CODE:

```javascript
//import in App.js:
import { createNativeStackNavigator } from "@react-navigation/native-stack";
```

16. Next inside export default function App(){} body before the return() statement add the following

CODE:

```javascript
const Stack = createNativeStackNavigator();
```

17. Now inside the SafeAreaProvider component add the following components that will wrap all your App screens:

CODE:

```javascript
<Stack.Navigator>
  <Stack.Screen
    name="HomeScreen"
    component={HomeScreen}
    options={{ headerShown: false }}
  />
</Stack.Navigator>
```

18. Now lets add another screen called the MapScreen right after the above code

CODE:

```javascript
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
```

Don't forget to import MapScreen component into App.js

19. Now when users click or touch on get a ride we want to navigate to the MapScreen. We will implement this using a Hook called [useNavigation()](https://reactnavigation.org/docs/use-navigation/)

20. We will implement this in NavOptions.js file where the touchableOpacity component gets rendered.

21. import the following

```javascript
//import
import { useNavigation } from "@react-navigation/native";
```

22. declare your hook inside the functional component of NavOptions

CODE:

```javascript
const navigation = useNavigation();
```

23. add event listener to TouchableOpacity and connect it to navigation hook object previously declared.

CODE: [just add the event listener part]

```javascript
<TouchableOpacity
onPress={() => navigation.navigate(item.screen)}
style={tw`pl-2 pb-8 pt-4 bg-gray-200 m-2 w-40`} >
```

Take a moment to appreciate the little big thing that has been achieved.

### CHECKPOINT:

1. What is react navigation how do you implment it in your App
2. What are react native elements how to do you implement it in your app.

### STEP 10: Google APIs

1. Goto link: https://github.com/FaridSafi/react-native-google-places-autocomplete

2. Add the package to your environment

```
   yarn add react-native-google-places-autocomplete
```

3. Get Google API keys for these google APIs

   1. NOTE: you need to enable billing on Google Cloud Platform for this. Note that there is a free quota of usage. If you query your APIs (google places, google maps, google distance matrix) over the free quota you will charged to your credit card. For testing and development purposes, you generally will not exceed the free quota.
   2. Goto link: https://cloud.google.com/
   3. sign in with your preferred gmail account. Use your personal gmail account and not your oakland.edu account.
   4. From top right corner, click on the button called "Console"
   5. IF you are using this for the first time, you need to find and click on new project
   6. If you have used this before, you will probably see some old project. From top left corner, see where it says Google Cloud, to the right of it, you will see the project name. Click on that.
   7. It will open a select a project window
   8. click on "New Project" button to the top right corner of this new window.
   9. follow the prompts and finish the project setup.
   10. once project is created make sure to select this project (if you have other projects).
   11. click on the hamburger menu icon on top left
   12. Click on API and Services (or click it from the quick access menu)
   13. Notice right below the search bar in the top center location of the window, there is an option called Enable APIS AND SERVICES. click on that.
   14. in the search bar of this new page, search for the following APIs: Directions API (click on the result and click on Enable button)
   15. after you enable this, it will take you back to a page where there will be two sections: enabled APIs and Additional APIs. From Additional API section enable the following APIs: Places API and Distance Matrix API
   16. Make sure you are in the right project folder.

#### ENABLE BILLING (otherwise these APIs wont work)

- click on the hamburger menu icon top left
- click billing
- click LINK A BILLING ACCOUNT
- click CREATE BILLING ACCOUNT
- fill out prompts, agree to T&C, click CONTINUE
- change account type to individual
- Add your credit/debit card infomartion
- Click on START MY FREE TRIAL
- finish off the rest of the prompts

Free trial will be for 90 days and you will get $300 worth usage (thats A LOT). You won't be charged after free trial ends unless you manually upgrade to a paid account so don't worry.

#### API Credentials / API Keys [SENSITIVE; Do Not Share unless you want to]

- go back to API and Services - enabled APIs from the hamburger menu.
- In this window on the left vertical look for "Credentials"
- For a fresh start, you will see no Keys
- See on the screen top center below the search bar the button "CREATE CREDENTIALS". click on it.
- Select "API Key" from the drop down menu
- Save your API key somewhere safe. This key will allow you to access all the APIs that you enabled right now.
- side note: once the key is created from the dashboard you can edit the key and add restrictions to it like this key can be used only from an android app or iOS app etc.

#### Setup your API key in your App

- go back to VSCode
- on the root level, create file called ".env"
- make sure you put ".env" in the .gitignore file so you don't accidentally push your key to github and expose it.
- IN THE .env file write the following:

```
GOOGLE_MAPS_APIKEY=y0UrK3yt4htyOucReated
```

#### Setup your project such that it can use env variables.

- Add the following package

```
yarn add react-native-dotenv
```

- Open your file called 'babel.config.js'. add the following lines of code right after the presets item

CODE:

```javascript
plugins: [
    [
        "module:react-native-dotenv",
        {
            moduleName: "@env",
            path: ".env",
        },
    ],
],
```

- From this package: https://github.com/FaridSafi/react-native-google-places-autocomplete, We will add the google-places-autocomplete to our HomeScreen.js file. This will allow users to search for source and destinations.

- Add the following code to HomeScreen.js

CODE:

```javascript
//import
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// import google api key (this is my env variable name, you will use yours.)
import { GOOGLE_MAPS_API_KEY } from "@env";
```

- side note: notice in babel config, we have given an alias moduleName for the package react-native-dotenv

- add the component RIGHT BEFORE THE NavOptions component

CODE:

```javascript
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
```

### To be Cont'd: Next Steps: get this data use a dispatch and update the state of origin in the data store's navSlice

### Step 11: Grab user input from google places autocomplete field and save to state of origin.

1. Once user enters the starting place for the ride, we need to grab this input and push it to the state in our data layer that will store the state of the starting location.

2. This will be done by "dispatch to a variable with an action". To declare and use the dispatch we will declare a hook called useDispatch()

3. Within HomeScreen.js, within the declaration of the HomeScreen functional component (right before return statement), declare the following dispatch:

CODE:

```javascript
// import the following:
import { useDispatch } from "react-redux";

//Add the following code:
const dispatch = useDispatch();
```

4. So, we now have a dispatcher. But how do we actually access the state and update it with the new value? Remember, in the data store's slice, navSlice, we had created setters to update the value of each state and then we had exported it. We now need to import these setters into our HomeScreen

CODE:

```javascript
//Also import the following
import { setOrigin, setDestination } from "../slices/navSlice";
```

5. Now we update the body the onPress() event listener for the component GooglePlacesAutocomplete, by removing the test console log code with the following code:

CODE:

```javascript
 onPress={(data, details = null) => {
            // console.log(data);
            // console.log(details);
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
```

DEBUG note: In navSlice.js, within the function body of createSlice(), the property reducers, need to be declared as plural i.e. it will reducers and not reducer.

### Step 12: Build the MapScreen component.

1. We will now plot the input from users in the HomeScreen and when they click the get a ride option on the HomeScreen we will open the MapScreen and show a Google Map.

2. Open the MapScreen.js file. At this point it will only have the boilerplate code.

3. We will design this screen by splitting the screen area in 2 View components. The first View will contain the Map, and the 2nd view will contain rest of the details as needed.

CODE:

```javascript
//import the following for styling
import tw from "tailwind-react-native-classnames";
```

4. Remove the boilerplate code from within the body of the MapScreen functional component and Add the following code:

CODE:

```javascript
const MapScreen = () => {
  return (
    <View>
      <Text>MapScreen boiler text</Text>

      <View style={tw`h-1/2`}></View>
      <View style={tw`h-1/2`}></View>
    </View>
  );
};
```

5. Now in the folder ./components create a new file and call it Map.js and create it with the boiler code snippet of rnfes.

CODE:

```javascript
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Map = () => {
  return (
    <View>
      <Text>Map default screen</Text>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
```

6. Now, go back to MapScreen.js and import the Map.js component within the first View component. Do not forget to import Map component before calling it in MapScreen.js

CODE:

```javascript
//import Map component
import Map from "../components/Map";

// call the component
<View style={tw`h-1/2`}>
  <Map />
</View>;
```

7. Now we use the following link as a reference to setup the map: https://github.com/react-native-maps/react-native-maps

8. Starting point to note in the above reference is that we will use the component called MapView to set things up. First lets install this package (stop server if needed).

```
yarn add react-native-maps
```

9. next import the package into your code for Map.js component. We will eventually also need an import that will show the pinned location on the map. Lets import that as well.

```javascript
//import MapView into Map.js
import MapView, { Marker } from "react-native-maps";
```

10. Render the MapView component on the MapScreen i.e. call MapView. For testing purposes lets copy and try out the MapView component code given in the reference link to see if it is working. Remember one more important thing. Just like Image component, if you do not give styling to the MapView component, you will not see it getting rendered on the screen.

CODE:

```javascript
// import tw obj for tailwind usage
const Map = () => {
  return (
    <MapView
      style={tw`flex-1`}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
```

now test if a default map shows up or not. stop and Restart your server if needed.

#### V.IMP BUG NOTE:

- I realized just with the above code, your maps will not render on the screen, even after you add styling. To address this you need follow the following steps.

- Go back to your Google Cloud Platform. https://cloud.google.com/console/google/maps-apis/overview

- Make sure you are in the right project folder.

- Go to APIs and services from the menu.

- Search for the following two APIs: "Maps SDK for Android" and "Maps SDK for iOS".

- Activate these APIs

- Now from menu again, go to "Credentials". Delete your previous API Key. Generate a new API key. Replace your old key with this new key in the .env file of your project.

- Rebuild your project (stop and restart your expo server), and it should work now.

11. Now we need to edit the MapView in such a way that when user enters origin and clicks get a ride menu option, it will go to the next screen, render the map and show the location of the origin on the map.

12. Note that at this point, the state of origin is being updated using the user input using the setOrigin method on the HomeScreen. So now, we need to PULL this data and recall we have defined selectors for each state to do this.

13. In Map.js component (right before the return statement), import and declare the required selector for the state - origin. We will do this by using a Hook called useSelector imported from react-redux package.

CODE:

```javascript
//import the following
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

// add the code
const Map = () => {
  const origin = useSelector(selectOrigin);
  return (
    <MapView
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    />
  );
};
```

14. Now we need to tie up the latitude and longitude property of the MapView component's initialRegion key with the user input value that has now been imported into the object origin inside of Map.js

```javascript
<MapView
  style={tw`flex-1`}
  mapType="mutedStandard"
  initialRegion={{
    latitude: origin.location.lat,
    longitude: origin.location.lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
/>
```

15. and put a marker on the map to kind of highlight that location. To do this we need to change MapView component into a parent component and put the marker code inside of it as a child component.

CODE:

```javascript
<MapView
  style={tw`flex-1`}
  mapType="mutedStandard"
  initialRegion={{
    latitude: origin.location.lat,
    longitude: origin.location.lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  }}
>
  {origin?.location && (
    <Marker
      coordinate={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      }}
      title="Origin"
      description={origin.description}
      identifier="origin"
    />
  )}
</MapView>
```

Code explanation:
the code origin?.location && (...) is to protect the app from trying to mark an undefined location in case the user does not enter any value for origin in the previous screen. we are using react conditional rendering to implement this logic. Go over the react native maps github library to self learn more usage.

16. Adding further protection to the APp. If user does not enter an origin location, do not show them the navigation options of getting a ride or anything else.

17. Go to NavOptions.js component file. Notice, that the navigation option are wrapped in the component called TouchableOpacity. We will add a prop to it such that this component is disabled if the state for origin is empty. So Lets grab the data in the state of origin using the hook useSelector in this file and declare it (just like we did in Map.js few steps back) and implement this logic

CODE:

```javascript
// import the following
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

// Declare the hook and selector before the return statement
const origin = useSelector(selectOrigin);

// add disabled prop to TouchableOpacity component like follows only add the changed code:
<TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`pl-2 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin}
        >
```

18. You can add some styling to the View container for the navOptions to make the disabled option more obvious. After saving the code restart your app server if needed.

CODE:

```javascript
<View style={tw`${!origin && "opacity-20"}`}>
            <Image
              style={{ width: 150, height: 150, resizeMode: "contain" }}
              source={item.image}
            />
//rest of code as is after this
```

### Building the botton half of the MapScreen

1. We will create a nested stack navigator in this area.

2. import and create stack navigator and other component needed to implement

```
yarn add "@react-navigation/stack"
```

CODE:

```javascript
//import
import { createStackNavigator } from "@react-navigation/stack";

//declare right before component return statement
const Stack = createStackNavigator();

// add following code to 2nd half of View code
<View style={tw`h-1/2`}>
  <Stack.Navigator>
    <Stack.Screen
      name="NavigateCard"
      component={NavigateCard}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
</View>;
```

3. In ./components add this new component with boiler plate code. we will use in the future called NavigateCard.js, and import this to MapScreen.js

4. Add another nested screen to the recently create stack. this will be to choose uber ride type/size.

```javascript
<Stack.Screen
  name="RideOptionsCard"
  component={RideOptionsCard}
  options={{
    headerShown: false,
  }}
/>
```

5. Create this new component in ./components just like you did for the previous one and import it to MapScreen.js.

6. The design logic is, when the MapScreen loads, the lower bottom of the screen will show the NavigateCard component which will have a navigation option to RideOptionsCard component.

BUG Note: If you get an error stating something along the lines of gesture-handler
execute the terminal command

```
yarn add react-native-gesture-handler
```

7. Add some styling to the NavigateCard component as shown below with some core components and google places api to input destination.

8. To do list:

- Give a welcome text,
- implment google places api to enter destination.
- Update state of destination in data store using the hook for useDispatch()
- allow navigation to the next component i.e. the RideOptionsCard.js

CODE:

```javascript
//import the following
import tw from "tailwind-react-native-classnames";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { setDestination } from "../slices/navSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

// add code right before return stmnt
const dispatch = useDispatch();
const navigation = useNavigation();

// remove boiler code in return stmnt and add
<SafeAreaView style={tw`bg-white flex-1`}>
  <Text style={tw`text-center py-5 text-xl`}>Good Morning, John Doe</Text>
  <View style={tw`border-t border-gray-200 flex-shrink`}>
    <View>
      <GooglePlacesAutocomplete
        placeholder="Enter your destination"
        styles={inputBoxStyles}
        debounce={400}
        nearbyPlacesAPI="GooglePlacesSearch"
        enablePoweredByContainer={false}
        minLength={2}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        returnKeyType={"search"}
        onPress={(data, details = null) => {
          // console.log(data);
          // console.log(details);
          dispatch(
            setDestination({
              location: details.geometry.location,
              description: data.description,
            })
          );
          navigation.navigate("RideOptionsCard");
        }}
      />
    </View>
  </View>
</SafeAreaView>;

// Add code for StyleSheet at the end
const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
```

You should have a nested react navigation implmented at this point.

### Update Map API with destination input mapping: DIRECTIONS API usage

1. Open component Map.js. Stop the server. Add the following package. Reference documentation for the package: https://github.com/bramus/react-native-maps-directions

```
yarn add react-native-maps-directions
```

2. import the value of the destination state into Map.js. Add the following code right below the useSelector() hook for the origin state.

```javascript
//import selectDestination from navSlice
const destination = useSelector(selectDestination);
```

3. Implement react conditional rendering with the following logic. If user has provided both the origin and destination, use the Directions API else if only origin use the basic Maps API which was already there. Insert the following code right before {origin?.location && ...

CODE:

```javascript
// import
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";

// add code before {origin?.location && ...
{
  origin && destination && (
    <MapViewDirections
      origin={origin.description}
      destination={destination.description}
      apikey={GOOGLE_MAPS_API_KEY}
      strokeWidth={3}
      strokeColor="black"
    />
  );
}
```

4. Zoom out the map such that it shows both the source and destination on the View area of the screen. To accomplish this, we need a "reference" to the MapView component such that it can be edited. We get this reference using a hook called useRef(). It is bassically creating a pointer.

CODE:

```javascript
//import
import { useRef } from "react";

//declare the hook where you have the other hooks
const mapRef = useRef(null);
```

5. In the MapView Component, add the following prop.

CODE:

```javascript


<MapView
      ref={mapRef}
// rest of the code as is
```

6. Now to redraw the MapView, we need a Marker component for the destination. Note how in Map.js you have a Marker component for origin. Replicate that code and replace origin with destination.

CODE:

```javascript
// add the following right after Marker for origin
{
  destination?.location && (
    <Marker
      coordinate={{
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      }}
      title="Destination"
      description={destination.description}
      identifier="destination"
    />
  );
}
```

7. Now we need to add a useEffect() hook. This is because Maps is external to react native and its behavior can be controlled only using this hook. The hook will monitor the values of origin and destination and if either one or both changes, it will execute a code to redraw the map as specified in the useEffect() body. Declare the hook right after all the other hooks.

CODE:

```javascript
// code for useEffect()
useEffect(() => {
  // if either value missing exit this body
  if (!origin || !destination) return;

  // else zoom out from Map to show both
  mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
    edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  });
}, [origin, destination]);
```

Test it out now for some different destinations. You can swipe back and change the destination and it should redraw. It is not completely smooth but it does the job (care on your google api query quota). At times the redraw is not working properly for me, you can take this up as a self challenge to look into the documentation of fitToSuppliedMarkers and try to debug it.

### Adding some UI components to uplift the presentation of the App

1. In ./components create a file called NavFavorites.js and populate it with boiler plate code.

CODE:

```javascript
//boiler plate code
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const NavFavorites = () => {
  return (
    <View>
      <Text>NavFavorites</Text>
    </View>
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
```

2. In HomeScreen.js import the component NavFavorites.js and call this component right after the NavOptions component.

CODE:

```javascript
//import
import NavFavorites from "../components/NavFavorites";

// call the component right after <NavOptions />
<NavFavorites />;
```

3.  The purpose of NavFavorites component is to show things like your home address or work address or frequently visited places etc. Replace the boiler code in NavFavorites with the following. Replace code for the whole file.

CODE:

```javascript
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

// hardcoded component data
const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    destination: "200 Lake Village Blvd., Auburn Hills, MI, USA",
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Work",
    destination: "Engineering Center, Oakland University, Rochester, MI, USA",
  },
];

const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={item.icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item.destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorites;

const styles = StyleSheet.create({});
```

4. Now you can re-use this NavFavorites component in the screen where the user will give destination input, i.e. in the file NavigateCard.js

CODE:

```javascript
</View>
        <NavFavorites />
      </View>
    </SafeAreaView>
```

As a self challenge you can try to implement the functionality that when users click on these home or work icons, it will fill the state of origin or destination.

5. App presentation issue: Notice how in the screen to enter destination, if user clicks on the destination input component, the keyboard comes up and it hides some of the content on the screen. To address this, we need to replace the basic View component with the KeyboardAvoidingView component.

6. In App.js import KeyboardAvoidingView component first from the react-native library. Now call this component right after the call to the SafeAreaProvider component and wrap the remainder of the app inside the KeyboardAvoidingView component. i.e. your updated App.js component code will look like shown below. This component behaves differently for iOS and Android so take care.

CODE:

```javascript
// import Platform and KeyboardAvoidingView from react-native

//code
return (
  <Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          style={{ flex: 1 }}
        >
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
            <Stack.Screen
              name="EatsScreen"
              component={EatsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
);
```

Code explanation: for KeyboardAvoidingView we add two props. The simpler prop is style prop that we are familiar with. The new prop is a behavior prop. However, the behavior is different for iOS vs. Android. In iOS it uses padding and for android we need to use height to make the space for the keyboard and shift the rest of the app upwards to make space for the keyboard. We use the Platform component to determine the platform and write this logic using a ternary conditional operator. The final prop is keyboardVerticalOffset which gives some space between the keyboard top and the App. The is handled by default on Android but you need to give a value for iOS.

7. Go back to NavigateCard.js. Right after the call to NavFavorites a View component closes. Add the following code right after that.

CODE:

```javascript
<View
  style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
>
  <TouchableOpacity
    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
  >
    <Icon name="car" type="font-awesome" color="white" size={16} />
    <Text style={tw`text-white text-center`}>Rides</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
  >
    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
    <Text style={tw`text-center`}>Eats</Text>
  </TouchableOpacity>
</View>
```

8. When we click on the Rides Icon added above we want to transition to the next screen which we have created in the ./component called RideOptionsCard.js. So first we need to add the event Listener of onPress() to this TouchableOpacity component that wraps this Icon component.

CODE:

```javascript
// ONLY ADD THE EVENT LISTENER
<TouchableOpacity
  onPress={() => navigation.navigate("RideOptionsCard")}
  style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
>
  <Icon name="car" type="font-awesome" color="white" size={16} />
  <Text style={tw`text-white text-center`}>Rides</Text>
</TouchableOpacity>
```

### Ride Options Screen

1. We will use the RideOptionsCard.js component to implement the following functionalities: calculate totalTravelTime, mileage, choose ride option like normal car large car or luxury car, and pricing options with pricing for peak hours.

2. Remove all the boiler plate code with the following code.

CODE:

```javascript
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: require("../assets/UberX.webp"),
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: require("../assets/UberXL.webp"),
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: require("../assets/UberLux.webp"),
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  // create a local state to highlight which ride option was selected
  const [selectedRide, setSelectedRide] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon name="chevron-left" type="font-awesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedRide(item)}
            style={tw`flex-row justify-between items-center px-10 ${
              item.id === selectedRide?.id && "bg-gray-200"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={item.image}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>Travel Time.....</Text>
            </View>
            <Text style={tw`text-xl`}>$10.00 </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selectedRide}
          style={tw`bg-black py-3 m-3 ${!selectedRide && "bg-gray-300"}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selectedRide?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
```

### Add dynamic pricing calculations using Distance Matrix API

1. Go in file Map.js in ./components. the computations need to be done inside a Map component, hence this file.

2. Import and declare another useEffect() hook (right below the existing useEffect hook) as shown below.

3. logic of hook: the execution of the body of the hook will be dependent on three values, origin destination and google maps api key. The body of the hook will take the values of origin and destination and send it to the distance matrix api to calculate the distance and receive the output back in an ASYNCHRONOUS way. We will then PUSH this calculated value to our redux store through a dispatch. Then later on in RideOptionsCard.js we will select this value from the redux store to dynamically display the distance between origin and destination and calculate price.

4. So the skeleton structure of this hook will look as follows:

CODE:

```javascript
useEffect(() => {
  // if either value missing exit this body
  if (!origin || !destination) return;

  const getTravelTime = async () => {};

  getTravelTime();
}, [origin, destination, GOOGLE_MAPS_API_KEY]);
```

5. Now inside the body of getTravelTime async function, we need to make a GET request or a fetch() to the google distance matrix api and the result returns an array of objects which will contain the miles between origin and destination and travel time. We will PUSH this data into our state for travelTimeInformation.

CODE:

```javascript
// only add the new part
useEffect(() => {
  // if either value missing exit this body
  if (!origin || !destination) return;

  const getTravelTime = async () => {
    const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      });
  };

  getTravelTime();
}, [origin, destination, GOOGLE_MAPS_API_KEY]);
```

6. Now we need to PULL this state information in the RideOptionsCard.js component. So first declare the hook to use the selector that will PULL the state information.

CODE:

```javascript
//import
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

//declare hook before return stmnt
const travelTimeInformation = useSelector(selectTravelTimeInformation);
```

7. Now update the code in the Text component where it says select a ride

CODE:

```javascript
</TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
```

With the following code:

UPDATED CODE:

```javascript
// only adding the new code
<Text style={tw`text-center py-5 text-xl`}>
  Select a Ride - {travelTimeInformation?.distance.text}
</Text>
```

Test it out. Now you should see the computed distance between origin and dest. dynamically.

8. Do further modifications to the travel time Text component.

CODE:

```javascript
//NEED TO MODIFY THIS
<Text>Travel Time.....</Text>
```

with the following code:

```javascript
<Text>{travelTimeInformation?.duration.text}</Text>
```

This should update the UI to display dynamic travel times.

9. Now we would want to dynamically compute the price based on the travel time information and type of ride selected. Before doing this, note that in the hardcoded data array in RideOptionsCard.js file, we have a key called multiplier. We will use this to determine price when a particular ride type is selected.

10. we declare a constant variable to store the peak hour price multiplier. Add the following right after your data array.

```javascript
const PEAK_HOUR_RATE = 1.5;
```

Using this, modify the following code:

```javascript
//modify this
<Text style={tw`text-xl`}>$10.00 </Text>
```

with the following code:

First add the following package

```
yarn add intl
```

We are going to properly format the output depending on the country language and currency.

Add the following imports:

```javascript
import Intl from "intl";
import "intl/locale-data/jsonp/en-US";
```

Now Add the following CODE in the location where we wanted to modify

```javascript
<Text style={tw`text-xl`}>
  {new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(
    (travelTimeInformation?.duration.value * PEAK_HOUR_RATE * item.multiplier) /
      100
  )}
</Text>
```

The formula for price calculation is a basic formula used and does not reflect the actual Uber calculations. As a self exercise you can actually check the time of the day and change the peak hour rate accordingly to calculate price. try it out.
