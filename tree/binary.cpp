#include "iostream"

struct Node {
  int data;
  Node* left;
  Node* right;
};

Node* getNewNode(int data) {
  Node* newNode = new Node();
  (*newNode).data = data;
  // newNode->data = data;
  newNode->left = newNode->right = NULL;
  return newNode;
}

Node* insertInto(Node* root,int data) {
  if(root == NULL) {
    root = getNewNode(data);
  } else if(data <= root->data) {
    root->left = insertInto(root->left,data);
  } else {
    root->right = insertInto(root->right,data);
  }
  return root;
}

bool search(Node* root, int data) {
  if(root == NULL) {
    return false;
  } else if(root->data == data) {
    return true;
  } else if(data <= root->data) {
    return search(root->left,data);
  } else {
    return search(root->right,data);
  }
}

int main() {
  Node* rootNode = NULL;
  rootNode = insertInto(rootNode,30);
  rootNode = insertInto(rootNode,20);
  rootNode = insertInto(rootNode,40);
  rootNode = insertInto(rootNode,50);
  rootNode = insertInto(rootNode,16);
  rootNode = insertInto(rootNode,24);
  std::cout << "Enter number to be searched: ";
  int number;
  std::cin >> number;
  if(search(rootNode,number) == true) {
    std::cout << "Found!" << '\n';
  } else {
    std::cout << "Not found." << '\n';
  }
  return 1;
}