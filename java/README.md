# Java

### Compiler

You can compile the code using `javac` command.

http://www.tutorialspoint.com/unix_commands/javac.htm

### Example 00

```sh
# from root breakfast
$ javac java/main.java
# this will output a the main class name HelloWorldApp.class
$ ls java/
> HelloWorldApp.class  main.java
# run the new app by specifying CLASSPATH env variable
$ CLASSPATH=java java HelloWorldApp
```

### Example 10

If in one file there are two or more classes.

```java
// declare class Hello
class Hello {
  // class body
  // field, constructor, and method declarations
}
// declare class World
class World {}
// declare class Run with the main method
class Run {
  public static void main(String[] args) {
    // run
  }
}
```

The compiler will create as many class files as there are classes in the .java
file. Or more formally the compiler creates a different output file for each type
defined in it in a `.java` file.

### Example 21

Using a source file to tell the compiler where to find the class declarations.

```sh
# form /breakfast/java
$ javac @21/sources.txt
```

Notice how the path inside of `sources.txt` has to be aware of where the command
was run.

**Resources**
- https://stackoverflow.com/questions/6623161/javac-option-to-compile-all-java-files-under-a-given-directory-recursively

### Example 30

Compiling nested classes will generate multiple files.

```sh
# inside java/30/
$ javac NestedClass.java
# will produce a file per class or subclass
$ ls
  NestedClass$InnerClass.class
  NestedClass$StaticNestedClass.class
  NestedClass.class
  Run.class
```

### Example 40

Trying to modularise pieces of code.

```sh
cd 40/
javac mytest/server/Server.java
java mytest/server/Server
# Echo from Client
```

### Example 50

File hierarchy is very important. Package names and folder structure are closely
related.

```sh
# from /breakfast/java
$ javac -classpath 50/ 50/App.java
# will compile
$ java -classpath 50/ App
  Echo from Globe A
  Echo from Town A
  Hello from App!
```

### Concepts

```java
class MyClass extends MySuperClass implements YourInterface {
  // class body
  // field, constructor, and method declarations
  // with modifiers like public or private which
}
```

### Questions

- What is the `classpath`?
- Why do public class names need to match the file name?

### Keywords

- classpath
- class
  - nested class
  - inner classes
- method
  - method signature
  - method overloading
  - constructor overloading
  - abstract methods
- fields
- inheritance
- superclass (also base class or parent class)
  - implicit superclass of `Object`
- subclass (also a derived class, extended class, or child class)
  - covariant return type
  - super keyword
- interface
  - implements the interface
- variables
  - Instance Variables (Non-Static Fields)
  - Class Variables (Static Fields)
  - static modifier
  - Local Variables
  - Parameters
- instantiating a Class
  - default constructor
- garbage collection
- access control
  - top level
  - member level
  - package-private
- annotations
  - type annotation
- casting objects
  - implicit casting
- packages
  - package members

### Resources

- https://docs.oracle.com/javase/tutorial/index.html
  - https://docs.oracle.com/javase/tutorial/java/index.html
    - https://docs.oracle.com/javase/tutorial/java/javaOO/index.html
    - https://docs.oracle.com/javase/tutorial/java/package/index.html
- https://docs.oracle.com/javase/tutorial/extra/generics/index.html
- https://stackoverflow.com/questions/18093928/what-does-could-not-find-or-load-main-class-mean
- https://docs.oracle.com/javase/tutorial/essential/environment/paths.html
- https://docs.oracle.com/javase/tutorial/getStarted/cupojava/unix.html
- https://docs.oracle.com/javase/tutorial/getStarted/problems/index.html
