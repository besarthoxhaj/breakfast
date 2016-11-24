#include <iostream>

class Stack {
private:
  int top;
public:
  Stack() {
    top = -1;
  }
  void print() {
    std::cout << "Hello, Stack!" << '\n';
  }
};

int main() {
  Stack simpleStack;
  simpleStack.print();
  return 0;
}