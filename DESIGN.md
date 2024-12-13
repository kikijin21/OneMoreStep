# DESIGN.md

## Project Title: **OneMoreStep**

---

## **Design Objective**
OneMoreStep is an NFC-based indoor navigation solution designed to help organizations serve the visually impaired and solve the “last step” of indoor navigation. The design objectives include the following.
1. Provide clear path planning function, capable of generating the shortest path from any starting point to any end point.
2. Provide real-time direction guidance and distance description for users through voice announcement function to enhance user experience.
3. Demonstrate the core functions of the product through interactive web demonstrations to support non-technical users to understand the application scenarios.

---

## **Functionality Overview**
- **NFC Scanning Function**:
  - Utilizes NFC tags to record the user's location.
  - Provides a simple and intuitive interaction experience.
- **Path Planning**:
  - Dynamically calculate the shortest path.
  - Supports path visualization, and dynamically displays path updates through the map.
- **Voice announcement**:
  - According to the real-time navigation path, generate clear direction guidance and walking distance description.
- **Interactive Demonstration**:
  - Use webpage animation to simulate the user's actual usage scenario.
  - Customizable start point and end point, and dynamically update the path map.

---

## **Technical Architecture**
### **Front-end**: The front-end of the web page.
- **HTML**: Realize page structure and content display.
- **CSS**: provide page style and visual design.
- **JavaScript**: implements dynamic interactions and logic, including path calculation and voice announcements.
  - Use `Canvas API` to draw maps and dynamic paths.
  - Uses the `Web Speech API` to implement voice announcements.

### **Backend** **Flask**: **Flask**.
- **Flask**.
  - Provides server-side support, including user registration, login, and database operations.
  - Uses Flask routing to control page jumps and feature interactions.
- **SQLite**.
  - Manages user data and subscription data.

---

## **Design process***
### 1. **System Analysis and Requirements Definition**
In the requirements definition phase, we divided users into two categories:
- **Enterprise users**: wish to utilize the system to provide services to the visually impaired.
- **Demonstration users**: wish to understand the system functions through simulation scenarios.


### 2. **System Module Design**
We have designed the following modules:
1. **User Module**:
   - Registration, login and user management.
   - User data is stored in SQLite database.
2. **Navigation Module**:
   - **Path Planning Algorithm**: graph-based breadth-first search (BFS) for shortest path calculation.
   - **Map drawing**: use Canvas to dynamically draw paths and maps.
   - **Speech Announcing**: generating direction guidance based on Web Speech API.
3. **Interactive Presentation Module**:
   - Provide start point and end point selection function.
   - Draws map paths in real time and provides voice guidance.

---

## **Technical details** ### 1.
### 1. **Path Planning***: **Data Structure***.
- **Data structure**: Use object to represent the adjacency matrix to store the reachable path of each point.
- **Algorithm implementation**:
    ``python
    def findShortestPath(start, end):
        queue = [[start]]
        visited = set()
        while queue.
            path = queue.pop(0)
            node = path[-1]
            if node == end.
                node = path[-1] if node == end: return path
            if node not in visited.
                visited.add(node)
                for neighbor in graph[node]: new_path = list(path)
                    new_path = list(path)
                    new_path.append(neighbor)
                    queue.append(new_path)
        return None
    ```

### 2. **Mapping**
- Draws maps dynamically using the Canvas API.
- Updates the map and animates dynamically according to the path selected by the user.

### 3. **Speech Announcing**
- Use Web Speech API:
    ```javascript
    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }
    ``

---

## **Challenges encountered in development and their solutions**
### 1. **Dynamics of Path Planning**
- **Challenge**: Path planning needs to support computation from any start point to any end point while ensuring that the result is the shortest path.
- **Solution**: The breadth-first search (BFS) is used to implement path planning, and the connection relationship between points is stored through the adjacency matrix to ensure the flexibility and efficiency of the algorithm.

### 2. **Accuracy of Voice Announcement**
- **Challenge**: The voice announcement needs to dynamically describe the direction in conjunction with the map to avoid expressions such as “go up” that do not match reality.
- **Solution**: Dynamically generate descriptions based on the relative positions of the starting point and the ending point, such as “go forward 10 meters, then turn left”, to enhance user understanding.

### 3. **Aesthetics of Page Layout**
- **Challenge**: The interaction page needs to be intuitive and aesthetically pleasing while displaying the map and path planning options.
- **Solution**: Adjust the layout of the page elements through CSS so that the map and interaction areas are clearly distributed to improve user experience.

### 4. **Jump Logic for User Login** **The user is logged in.
- **Challenge**: After successful login, we need to display the success message and jump to the homepage at the same time.
- **Solution**: Using Flask's `flash` and `redirect` functions, display a reminder message in the login interface and automatically jump to the homepage.

---

## **Design Decisions***
1. **Technology Stack Selection
   - Choose Flask and SQLite as the backend framework to ensure the project is simple and easy to deploy.
   - HTML, CSS and JavaScript are chosen to realize the front-end interaction, focusing on the simplicity and functionality of the page. 2.

2. **Algorithm Implementation**
   - BFS is used as the path planning algorithm to ensure the computational efficiency and accuracy of the results. 3.

3. **User Experience**
   - Enhance the immersion of navigation through the combination of voice announcement and map.

---

## **Testing and Improvement**
1. **Functionality testing**
   - Test whether the user registration and login process is normal.
   - Test whether the path planning function generates the correct shortest path.
   - Test whether the voice broadcast function is clear and accurate.

2. **User feedback**
   - Collect users' opinions on the interface design and optimize the layout.
   - Add more map points and paths to enrich the demo.

3. **Known Issues**
   - Browser compatibility: Voice broadcast function may be unstable in some browsers.
   - Data Scale: The current adjacency matrix design is applicable to small and medium-sized maps, and can be expanded to support larger-scale scenarios in the future.

---

## **Future Improvement Direction***
1. **Enhancement of map functions**
   - Support more complex path types (e.g. floor switching).
   - Introducing 3D models to show navigation paths more intuitively.
2. **Multi-language support**
   - Provide Chinese and English voice announcement options.
   - Optimize system support for international users.
3. **Mobile Adaptation**
   - Develop mobile application to support NFC direct interaction.
   - Provide a more portable navigation experience.

---

## **Personal Information and Summary**

### **Developer Information**
- **Name**: Yunqi Jin
- **Email**: yjin1@fas.harvard.edu / yunqi_jin@brown.edu
- **School**: Brown University (Harvard Cross-Register)
- **Course**: CS50 - Introduction to Computer Science
- **Semester**: Fall 2024

---

### **Acknowledgments**
I would like to extend a special thanks to the CS50 teaching team and fellow students for your support and guidance that allowed me to complete this project. In addition, thank you to my friends and onemorestep project team members for their encouragement and support throughout the process.

---

### **Summary**
OneMoreStep is an indoor navigation solution with the purpose of serving the society with technology, which not only realizes the landing from technology to application, but also makes me realize the unlimited potential of computer science in solving practical problems. In the future, I hope to further expand this program to help more visually impaired people to improve their independence and safety, as well as to explore technology solutions to more social problems.
