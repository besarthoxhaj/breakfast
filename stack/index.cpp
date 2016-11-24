#include <iostream>

class Stack {
private:
  int top;
  int A[10];
public:
  Stack() {
    top = -1;
  }
  void push(int num) {
    A[++top] = num;
  }
  void pop() {
    top--;
  }
  void print() {
    for(int ii = 0; ii <= top; ii++) {
      std::cout << A[ii] << '\n';
    }
  }
};

int main() {
  Stack simpleStack;
  simpleStack.push(2);
  simpleStack.push(1);
  simpleStack.push(4);
  simpleStack.push(3);
  simpleStack.pop();
  simpleStack.print();
  return 0;
}