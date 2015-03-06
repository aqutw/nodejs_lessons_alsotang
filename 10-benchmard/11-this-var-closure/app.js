function foo() {
  value = "hello";
}
foo();
console.log(value); // 输出hello
console.log(global.value) // 输出hello


console.log(global);//<--------try to look it
