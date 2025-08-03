export type Pattern = {
  name: string;
  category: string;
  explanation: string;
  briefCode: string;
  simplestCode: string;
};

export const patternsData: Pattern[] = [
  {
    name: "Abstract Factory",
    category: "Creational",
    explanation:
      "Provides an interface for creating families of related or dependent objects without specifying their concrete classes.",
    briefCode: `// Abstract Products\nclass Button {\n  render() { throw new Error(\"Method 'render()' must be implemented.\"); }\n}\n\nclass Checkbox {\n  render() { throw new Error(\"Method 'render()' must be implemented.\"); }\n}\n\n// Concrete Products (Dark Theme)\nclass DarkButton extends Button {\n  render() { console.log(\"Rendering Dark Button\"); }\n}\nclass DarkCheckbox extends Checkbox {\n  render() { console.log(\"Rendering Dark Checkbox\"); }\n}\n// Concrete Products (Light Theme)\nclass LightButton extends Button {\n  render() { console.log(\"Rendering Light Button\"); }\n}\nclass LightCheckbox extends Checkbox {\n  render() { console.log(\"Rendering Light Checkbox\"); }\n}\n// Abstract Factory\nclass GUIFactory {\n  createButton() { throw new Error(\"Method 'createButton()' must be implemented.\"); }\n  createCheckbox() { throw new Error(\"Method 'createCheckbox()' must be implemented.\"); }\n}\n// Concrete Factories\nclass DarkGUIFactory extends GUIFactory {\n  createButton() { return new DarkButton(); }\n  createCheckbox() { return new DarkCheckbox(); }\n}\nclass LightGUIFactory extends GUIFactory {\n  createButton() { return new LightButton(); }\n  createCheckbox() { return new LightCheckbox(); }\n}\n// Client Code\nfunction renderUI(factory) {\n  const button = factory.createButton();\n  const checkbox = factory.createCheckbox();\n  button.render();\n  checkbox.render();\n}\nconsole.log(\"Dark Theme UI:\");\nrenderUI(new DarkGUIFactory());\nconsole.log("\\nLight Theme UI:");\nrenderUI(new LightGUIFactory());`,
    simplestCode: `class ProductA { constructor(type) { this.type = type; } }\nclass ProductB { constructor(type) { this.type = type; } }\nclass ConcreteFactory1 {\n  createProductA() { return new ProductA(\"Type1A\"); }\n  createProductB() { return new ProductB(\"Type1B\"); }\n}\nclass ConcreteFactory2 {\n  createProductA() { return new ProductA(\"Type2A\"); }\n  createProductB() { return new ProductB(\"Type2B\"); }\n}\nconst factory1 = new ConcreteFactory1();\nconsole.log(factory1.createProductA()); // ProductA { type: 'Type1A' }\nconsole.log(factory1.createProductB()); // ProductB { type: 'Type1B' }`,
  },
  {
    name: "Adapter",
    category: "Structural",
    explanation:
      "Allows objects with incompatible interfaces to collaborate. It acts as a wrapper that translates calls from one interface to another.",
    briefCode: `// The \"Adaptee\" - an existing class with an incompatible interface\nclass OldCalculator {\n  add(operand1, operand2) {\n    return operand1 + operand2;\n  }\n}\n// The \"Target\" interface that the client expects\nclass NewCalculator {\n  sum(a, b) {\n    throw new Error(\"Method 'sum()' must be implemented.\");\n  }\n}\n// The \"Adapter\"\nclass CalculatorAdapter extends NewCalculator {\n  constructor(oldCalculator) {\n    super();\n    this.oldCalculator = oldCalculator;\n  }\n  sum(a, b) {\n    // Translate the new interface call to the old interface call\n    return this.oldCalculator.add(a, b);\n  }\n}\n// Client code using the NewCalculator interface\nconst newCalc = new CalculatorAdapter(new OldCalculator());\nconsole.log(\`Using adapter: 5 + 3 = \${newCalc.sum(5, 3)}\`);`,
    simplestCode: `class OldService {\n  doOldStuff(data) { return \`Old: \${data}\`; }\n}\nclass NewServiceAdapter {\n  constructor(oldService) { this.oldService = oldService; }\n  doNewStuff(input) { return this.oldService.doOldStuff(input); }\n}\nconst old = new OldService();\nconst adapter = new NewServiceAdapter(old);\nconsole.log(adapter.doNewStuff(\"hello\")); // Old: hello`,
  },
  {
    name: "Builder",
    category: "Creational",
    explanation:
      "Separates the construction of a complex object from its representation, allowing the same construction process to create different representations.",
    briefCode: `// Product\nclass Car {\n  constructor() {\n    this.parts = {};\n  }\n  addPart(key, value) {\n    this.parts[key] = value;\n  }\n  show() {\n    console.log(\"Car built:\", JSON.stringify(this.parts));\n  }\n}\n\n// Builder Interface\nclass CarBuilder {\n  buildEngine() { throw new Error(\"Method 'buildEngine()' must be implemented.\"); }\n  buildWheels() { throw new Error(\"Method 'buildWheels()' must be implemented.\"); }\n  buildBody() { throw new Error(\"Method 'buildBody()' must be implemented.\"); }\n  getCar() { throw new Error(\"Method 'getCar()' must be implemented.\"); }\n}\n\n// Concrete Builder\nclass SportsCarBuilder extends CarBuilder {\n  constructor() {\n    super();\n    this.car = new Car();\n  }\n  buildEngine() { this.car.addPart(\"engine\", \"V8 Sports Engine\"); }\n  buildWheels() { this.car.addPart(\"wheels\", \"20-inch Alloy Wheels\"); }\n  buildBody() { this.car.addPart(\"body\", \"Aerodynamic Sports Body\"); }\n  getCar() { return this.car; }\n}\n\n// Director\nclass Director {\n  construct(builder) {\n    builder.buildEngine();\n    builder.buildWheels();\n    builder.buildBody();\n    return builder.getCar();\n  }\n}\n\nconst director = new Director();\nconst sportsCarBuilder = new SportsCarBuilder();\nconst sportsCar = director.construct(sportsCarBuilder);\nsportsCar.show();`,
    simplestCode: `class Product { constructor() { this.parts = []; } add(part) { this.parts.push(part); } }\n\nclass Builder {\n  constructor() { this.product = new Product(); }\n  buildPartA() { this.product.add(\"PartA\"); return this; }\n  buildPartB() { this.product.add(\"PartB\"); return this; }\n  getResult() { return this.product; }\n}\n\nconst builder = new Builder();\nconst p = builder.buildPartA().buildPartB().getResult();\nconsole.log(p.parts); // [ 'PartA', 'PartB' ]`,
    // ...removed duplicate Builder entry...
  },
  {
    name: "Factory Method",
    category: "Creational",
    explanation:
      "Defines an interface for creating an object, but lets subclasses alter the type of objects that will be created.",
    briefCode: `class Dialog {\n  createButton() { throw new Error('Override!'); }\n  render() {\n    const button = this.createButton();\n    button.onClick();\n  }\n}\nclass WindowsDialog extends Dialog {\n  createButton() { return new WindowsButton(); }\n}\nclass WebDialog extends Dialog {\n  createButton() { return new WebButton(); }\n}\nclass WindowsButton { onClick() { console.log('Windows Button'); } }\nclass WebButton { onClick() { console.log('Web Button'); } }\nnew WindowsDialog().render();\nnew WebDialog().render();`,
    simplestCode: `class Creator {\n  create() { return {}; }\n}\nconsole.log(new Creator().create());`,
  },
  {
    name: "Prototype",
    category: "Creational",
    explanation:
      "Creates new objects by copying an existing object, known as the prototype.",
    briefCode: `const carPrototype = { drive() { console.log('Driving'); } };\nconst car1 = Object.create(carPrototype);\ncar1.drive();`,
    simplestCode: `const proto = { x: 1 };\nconst obj = Object.create(proto);\nconsole.log(obj.x);`,
  },
  {
    name: "Singleton",
    category: "Creational",
    explanation:
      "Ensures a class has only one instance and provides a global point of access to it.",
    briefCode: `class Singleton {\n  constructor() {\n    if (Singleton.instance) return Singleton.instance;\n    Singleton.instance = this;\n  }\n}\nconst a = new Singleton();\nconst b = new Singleton();\nconsole.log(a === b); // true`,
    simplestCode: `const singleton = (() => { let instance; return () => instance || (instance = {}); })();\nconsole.log(singleton() === singleton());`,
  },
  {
    name: "Bridge",
    category: "Structural",
    explanation:
      "Decouples an abstraction from its implementation so that the two can vary independently.",
    briefCode: `class Device { enable() {} }\nclass TV extends Device { enable() { console.log('TV on'); } }\nclass Remote {\n  constructor(device) { this.device = device; }\n  turnOn() { this.device.enable(); }\n}\nconst remote = new Remote(new TV());\nremote.turnOn();`,
    simplestCode: `const impl = { op: () => 'impl' };\nconst abs = { run: () => impl.op() };\nconsole.log(abs.run());`,
  },
  {
    name: "Composite",
    category: "Structural",
    explanation:
      "Composes objects into tree structures to represent part-whole hierarchies.",
    briefCode: `class Component { operation() {} }\nclass Leaf extends Component { operation() { return 'Leaf'; } }\nclass Composite extends Component {\n  constructor() { super(); this.children = []; }\n  add(child) { this.children.push(child); }\n  operation() { return this.children.map(c => c.operation()).join(', '); }\n}\nconst root = new Composite();\nroot.add(new Leaf());\nconsole.log(root.operation());`,
    simplestCode: `const leaf = { op: () => 'leaf' };\nconst comp = { children: [leaf], op: function() { return this.children.map(c => c.op()).join(); } };\nconsole.log(comp.op());`,
  },
  {
    name: "Decorator",
    category: "Structural",
    explanation:
      "Adds new behavior to objects dynamically by placing them inside special wrapper objects.",
    briefCode: `function coffee() { return 'Coffee'; }\nfunction withMilk(fn) { return () => fn() + ' + Milk'; }\nconst milkCoffee = withMilk(coffee);\nconsole.log(milkCoffee());`,
    simplestCode: `const base = x => x;\nconst deco = fn => x => fn(x) + '!';\nconsole.log(deco(base)('hi'));`,
  },
  {
    name: "Facade",
    category: "Structural",
    explanation: "Provides a simplified interface to a complex subsystem.",
    briefCode: `class Engine { start() { console.log('Engine started'); } }\nclass Car {\n  constructor() { this.engine = new Engine(); }\n  start() { this.engine.start(); }\n}\nnew Car().start();`,
    simplestCode: `const sub = () => 'sub';\nconst facade = () => sub();\nconsole.log(facade());`,
  },
  {
    name: "Flyweight",
    category: "Structural",
    explanation:
      "Reduces memory usage by sharing as much data as possible with similar objects.",
    briefCode: `class Flyweight { constructor(shared) { this.shared = shared; } }\nclass Factory {\n  constructor() { this.pool = {}; }\n  get(shared) {\n    if (!this.pool[shared]) this.pool[shared] = new Flyweight(shared);\n    return this.pool[shared];\n  }\n}\nconst factory = new Factory();\nconst a = factory.get('A');\nconst b = factory.get('A');\nconsole.log(a === b);`,
    simplestCode: `const pool = {};\nconst get = k => pool[k] || (pool[k] = { k });\nconsole.log(get('x') === get('x'));`,
  },
  {
    name: "Proxy",
    category: "Structural",
    explanation:
      "Provides a surrogate or placeholder for another object to control access to it.",
    briefCode: `const target = { msg: 'hi' };\nconst handler = { get: (obj, prop) => prop in obj ? obj[prop] : 'nope' };\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.msg);\nconsole.log(proxy.unknown);`,
    simplestCode: `const obj = { x: 1 };\nconst proxy = new Proxy(obj, {});\nconsole.log(proxy.x);`,
  },
  {
    name: "Chain of Responsibility",
    category: "Behavioral",
    explanation:
      "Passes a request along a chain of handlers until one of them handles it.",
    briefCode: `class Handler {\n  setNext(handler) { this.next = handler; return handler; }\n  handle(req) { if (this.next) return this.next.handle(req); }\n}\nclass AuthHandler extends Handler {\n  handle(req) { if (req.auth) return 'Auth'; return super.handle(req); }\n}\nclass LogHandler extends Handler {\n  handle(req) { console.log('Log'); return super.handle(req); }\n}\nconst chain = new AuthHandler();\nchain.setNext(new LogHandler());\nconsole.log(chain.handle({ auth: true }));`,
    simplestCode: `const h1 = x => x > 0 ? 'ok' : null;\nconst h2 = x => x < 0 ? 'neg' : null;\nconsole.log(h1(-1) || h2(-1));`,
  },
  {
    name: "Command",
    category: "Behavioral",
    explanation:
      "Encapsulates a request as an object, thereby letting you parameterize clients with different requests.",
    briefCode: `class Light { on() { console.log('Light on'); } }\nclass LightOnCommand {\n  constructor(light) { this.light = light; }\n  execute() { this.light.on(); }\n}\nconst light = new Light();\nconst cmd = new LightOnCommand(light);\ncmd.execute();`,
    simplestCode: `const cmd = () => 'run';\nconsole.log(cmd());`,
  },
  {
    name: "Iterator",
    category: "Behavioral",
    explanation:
      "Provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation.",
    briefCode: `const arr = [1,2,3];\nconst it = arr[Symbol.iterator]();\nconsole.log(it.next().value);`,
    simplestCode: `for (const x of [1,2]) console.log(x);`,
  },
  {
    name: "Mediator",
    category: "Behavioral",
    explanation:
      "Defines an object that encapsulates how a set of objects interact.",
    briefCode: `class Mediator {\n  notify(sender, event) {\n    if (event === 'A') console.log('A');\n    if (event === 'B') console.log('B');\n  }\n}\nclass Component {\n  constructor(mediator) { this.mediator = mediator; }\n  triggerA() { this.mediator.notify(this, 'A'); }\n}\nconst med = new Mediator();\nconst comp = new Component(med);\ncomp.triggerA();`,
    simplestCode: `const med = { notify: e => e };\nconsole.log(med.notify('x'));`,
  },
  {
    name: "Memento",
    category: "Behavioral",
    explanation:
      "Captures and restores an object's internal state without violating encapsulation.",
    briefCode: `class Memento { constructor(state) { this.state = state; } }\nclass Originator {\n  setState(state) { this.state = state; }\n  save() { return new Memento(this.state); }\n  restore(m) { this.state = m.state; }\n}\nconst origin = new Originator();\norigin.setState('A');\nconst m = origin.save();\norigin.setState('B');\norigin.restore(m);\nconsole.log(origin.state);`,
    simplestCode: `let state = 'x';\nconst save = () => state;\nconst restore = s => state = s;\nrestore(save());`,
  },
  {
    name: "Observer",
    category: "Behavioral",
    explanation:
      "Defines a one-to-many dependency so that when one object changes state, all its dependents are notified and updated automatically.",
    briefCode: `class Subject {\n  constructor() { this.observers = []; }\n  subscribe(obs) { this.observers.push(obs); }\n  notify(msg) { this.observers.forEach(o => o.update(msg)); }\n}\nclass Observer { update(msg) { console.log('Got', msg); } }\nconst subj = new Subject();\nconst obs = new Observer();\nsubj.subscribe(obs);\nsubj.notify('Hello');`,
    simplestCode: `const obs = [x => x];\nobs.forEach(fn => fn('hi'));`,
  },
  {
    name: "State",
    category: "Behavioral",
    explanation:
      "Allows an object to alter its behavior when its internal state changes.",
    briefCode: `class State { handle() {} }\nclass OnState extends State { handle() { console.log('On'); } }\nclass OffState extends State { handle() { console.log('Off'); } }\nclass Context {\n  setState(state) { this.state = state; }\n  request() { this.state.handle(); }\n}\nconst ctx = new Context();\nctx.setState(new OnState());\nctx.request();`,
    simplestCode: `let state = () => 'on';\nconsole.log(state());`,
  },
  {
    name: "Strategy",
    category: "Behavioral",
    explanation: "Enables selecting an algorithm's behavior at runtime.",
    briefCode: `class StrategyA { execute() { return 'A'; } }\nclass StrategyB { execute() { return 'B'; } }\nclass Context {\n  setStrategy(strat) { this.strat = strat; }\n  run() { return this.strat.execute(); }\n}\nconst ctx = new Context();\nctx.setStrategy(new StrategyA());\nconsole.log(ctx.run());`,
    simplestCode: `const strat = x => x + 1;\nconsole.log(strat(2));`,
  },
  {
    name: "Template Method",
    category: "Behavioral",
    explanation:
      "Defines the skeleton of an algorithm in the superclass but lets subclasses override specific steps of the algorithm without changing its structure.",
    briefCode: `class Game {\n  play() { this.start(); this.end(); }\n  start() { throw 'Override!'; }\n  end() { throw 'Override!'; }\n}\nclass Chess extends Game {\n  start() { console.log('Chess starts'); }\n  end() { console.log('Chess ends'); }\n}\nnew Chess().play();`,
    simplestCode: `const base = { run: () => 'x' };\nconsole.log(base.run());`,
  },
  {
    name: "Visitor",
    category: "Behavioral",
    explanation:
      "Lets you define new operations on objects without changing the objects themselves.",
    briefCode: `class Visitor { visit(element) { element.accept(this); } }\nclass Element { accept(visitor) { visitor.visit(this); } }\nconst v = new Visitor();\nconst e = new Element();\nv.visit(e);`,
    simplestCode: `const visit = x => x;\nconsole.log(visit('hi'));`,
  },
];
