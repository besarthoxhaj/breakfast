#include "iostream"
#include "queue"

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

void levelOrder(Node* root) {
  if(root == NULL) return;
  std::queue<Node*> Q;
  Q.push(root);
  // while there is at least one discovered node
  while (!Q.empty()) {
    Node* current = Q.front();
    std::cout << current->data << '\n';
    if(current->left != NULL) Q.push(current->left);
    if(current->right != NULL) Q.push(current->right);
    Q.pop();
  }
}

void preOrder(Node *root) {
  if(root == NULL) return;
  std::cout << root->data << '\n';
  preOrder(root->left);
  preOrder(root->right);
}

void inOrder(Node *root) {
  if(root == NULL) return;
  inOrder(root->left);
  std::cout << root->data << '\n';
  inOrder(root->right);
}

void postOrder(Node *root) {
  if(root == NULL) return;
  postOrder(root->left);
  postOrder(root->right);
  std::cout << root->data << '\n';
}

bool isBstUtil(Node* root, int minValue, int maxValue) {
  if(root == NULL) return true;
  if(
    root->data > minValue && root->data < maxValue
    && isBstUtil(root->left, minValue, root->data)
    && isBstUtil(root->right, root->data, maxValue)
  ) {
    return true;
  } else {
    return false;
  }
}

bool isBinarySearch(Node* root) {
  return isBstUtil(root,0,100);
}

int main() {
  /*
            30
        20      40
      16  24      50
   */
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
  std::cout << "Print levelOrder traversal" << '\n';
  levelOrder(rootNode);
  std::cout << "Print preOrder traversal" << '\n';
  preOrder(rootNode);
  std::cout << "Print inOrder traversal" << '\n';
  inOrder(rootNode);
  std::cout << "Print postOrder traversal" << '\n';
  postOrder(rootNode);
  std::cout << "Check if tree is binary serach" << '\n';
  if(isBinarySearch(rootNode) == true) {
    std::cout << "YES" << '\n';
  } else {
    std::cout << "NO" << '\n';
  }
  return 1;
}