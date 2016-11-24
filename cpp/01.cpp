/**
 * To every `main` function the operating system passes
 * to arguments.
 * $> g++ 01.cpp -o 01.out && ./01.cpp
 *
 * To test the behaviour and the arguments of `main` try:
 * $> ./01.out hello world
 */

#include <iostream>

int main(
  int argc, // argc -> argument count
  char const *argv[] // argv -> argument vector with a 
) {
  std::cout << "Hello, World!" << std::endl;
  std::cout << "Hello, World!\n";
  std::cout << argc << std::endl;
  std::cout << argv << std::endl;
  std::cout << *argv << std::endl;
  std::cout << argv[0] << std::endl;
  std::cout << argv[1] << std::endl;
  std::cout << argv[2] << std::endl;
  for(int ii = 0; ii < argc; ii++) {
    std::cout << "Argv:" << ii << " -> " << argv[ii] << '\n';
  }

  return 0;
}