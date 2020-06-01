/**
 *
 *
 */
func greet(name: String, alreadyGreeted: Bool) -> String {

  if (alreadyGreeted) { return "Hello again, " + name; }
  return "Hello, " + name;
}

print(greet(name: "Foo", alreadyGreeted: true))