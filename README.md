<div align="center">

![Logo](client/public/KandooLogoW.png)

![Kandoo Demo gif](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3hvZjlxYWxscjI3NzdxMmVjM3B2ZzZ6enZlcGcycnoxMjlwdjRrbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1VmzvCMmX2iMyzC9Ft/giphy.gif)

A collaborative tool for the next project for individuals and engineering teams looking for more organization. This tool was borne from the desire for the #100Devs community (community of 50,000 and growing engineers) to utilize this as a way to organize as indiviudals and for teams to utilize without the distractions that you might find on Trello or Github.

![GitHub Repo stars](https://img.shields.io/github/stars/snowballDevs/kandoo?logo=github)![Static Badge](https://img.shields.io/badge/react-18.2.0-blue)![Static Badge](https://img.shields.io/badge/tailwindcss-%3E%3D3.0-green)![Static Badge](https://img.shields.io/badge/node-%3E%3D18.18.0-green)![Static Badge](https://img.shields.io/badge/express-%3E%3D4.18-black)![Static Badge](https://img.shields.io/badge/mongodb-5.5-yellow)


</div>

## Optimizations

At a system design level, we chose to leverage the nested model nature of MongoDB and the inherent synergy with React Node apps. With this in mind, we can definitely improve the app through refactors and optimizations through database queries. We can also introduce caching via Redis or Memcached. Caching frequently used data would be a good next step to improve performance across the app. By caching more frequently used data, we can avoid having to recalculate certain aspects within our app.

We can also introduce libraries to manage state better throughout the application such as Redux, Mobx, or Recoil. With a state management library, managing state would become more predictable, debuggable, and will bring efficient handling of more complex state changes.

### Testing

Testing is something that we would have liked to add in the beginning. It would have made PR reviews a lot faster and would have standardized the code base even more so than just having ES lint to leverage.

### Accessibility

With this project, we initially used Daisy UI for its free easy-to-use components, but after realizing the accessibility for users was sub-par (modals were completely inaccessible), we refactored our app to use out-of-the-box tailwind as it offered a better user experience.



## Lessons Learned

Overall, this was a great learning process from team dynamics and team building, to learning the technical aspects of a single page application utilizing the MERN stack among other notable packages such as dndkit and passport.

Something that was especially important to increase efficiency and boosted our learning was pairing and mobbing. My pairing together to solve for an agreed-upon issue proved dividends as both parties are able to teach, give back, and ultimately learn together.

The new skills that we have picked up with this project are invaluable and will provide a good launching pad for projects both big and small for years to come.

### Skills Learned / Improved upon

-   MERN Stack Technology
-   Git Branch Best Practices (Feature Branching)
-   GitHub Project Organization (Issues, PRs, Discussions)

### Other Learnings

-   Agile Scrum
-   Communications Skills
-   Time Management
-   Conflict Resolution

<hr>

## Roadmap

### Features

-   Chat Room Functionality
-   Integrations to Github and Discord

### Technology Optimizations

-   State Management Library (Redux/Recoil)
-   Refactoring drag and drop
-   JWT Authentication
-   Websockets
-   React Router

<hr>

## Run Locally

Clone the project

```bash
  git clone kandoo
```

Go to the project directory

```bash
  cd kandoo
```

Install dependencies

```bash
  npm install
```

Install dependencies for client sub-directory

```bash
  cd client
  npm install
```

Install dependencies for server sub-directory

```bash
  cd server
  npm install
```

Start the server

```bash
  npm run start
```

<hr>

## Authors

-   [@mjbramich](https://github.com/mjbramich)
-   [@IntelliJinceTech](https://github.com/IntelliJinceTech)
-   [@AitchGrasso](https://github.com/AitchGrasso)
## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
