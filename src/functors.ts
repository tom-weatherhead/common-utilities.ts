// github.com/tom-weatherhead/common-utilities.ts/src/functors.ts

export interface IFunctor<T> {
	map<U>(f: (x: T) => U): IFunctor<U>;
	getValue(): T;
}

export class UniversalFunctor<T> implements IFunctor<T> {
	private value: T;

	constructor(valueIn: T) {
		this.value = valueIn;
	}

	public getValue(): T {
		return this.value;
	}

	public map<U>(f: (x: T) => U): IFunctor<U> {
		return new UniversalFunctor<U>(f(this.value));
	}
}

/*
// From https://gist.github.com/lierdakil/2ece55b7684c5923b1ea4c36df643455 :

interface Functor<T> {
	map<U>(f: (x: T) => U): Functor<U>
}

class Box<T> implements Functor<T> {
	value: T

	constructor(x: T) {
		this.value = x
	}

	map<U>(f: (x: T) => U): Box<U> {
		return new Box(f(this.value))
	}

	toString(): string {
		return `Box(${this.value.toString()})`
	}
}

const box = <T> (x: T): Box<T> => new Box(x)

const log = (msg: string, x: any) => {
  const pre = document.createElement('pre')
  pre.innerText = `${msg} ==> ${x.toString()}`
  document.body.appendChild(pre)
}
const trim = (x: string) => x.trim()
const len = (x: string) => x.length
const inc = (x: number) => x+1
function compose<T,U,V>(x: (arg: T) => U, y: (arg: U) => V): (arg: T) => V {
  return arg => y(x(arg))
}

box(' 42 ')   // contains a string
    .map(trim)
    .map(len)
    .map(inc)

// vs

box([' 42 ', 'ABC ', 'x'])   // contains an array
    .map(array => array.map(trim))
    .map(array => array.map(len))
    .map(array => array.map(inc))

// is the same as

box(' 42 ')   // contains a string
    .map(compose(compose(trim, len), inc))

box([' 42 ', 'ABC ', 'x'])   // contains an array
    .map(array => array.map(compose(compose(trim, len), inc)))

// looks better if we do it like this

function fmap<T, U>(f: (arg: T) => U): (Fx: Functor<T>) => Functor<U> {
  return Fx => Fx.map(f)
}

log(
  "fmap(compose(compose(trim, len), inc))(box(' 42 '))",
  fmap(compose(compose(trim, len), inc))(box(' 42 '))
)

log(
  "fmap(fmap(compose(compose(trim, len), inc)))(box([' 42 ', 'ABC ', 'x']))",
  fmap(fmap(compose(compose(trim, len), inc)))(box([' 42 ', 'ABC ', 'x']))
)

// the true powef of fmap is being applicable to any structure that can be mapped over

class Maybe<T> implements Functor<T>{
  value: {val: T, type: 'just'} | {type: 'nothing'}
  constructor(x?: T) {
    if (x != null) this.value = { val: x, type: 'just' }
    else this.value = { type: 'nothing' }
  }

  map<U>(f: (x: T | undefined) => U): Functor<U> {
    if (this.value.type === 'just') return just(f(this.value.val))
    else return nothing()
  }

  toString(): string {
    if (this.value.type === 'just')
      return `just(${this.value.val.toString()})`
    else
      return `nothing()`
  }
}

const just = <T> (x: T) => new Maybe<T>(x)
const nothing = <T> () => new Maybe<T>() // bad style, I know, <T> is just a type assertion in disguise

// this is fmap over array
log(
  "fmap(compose(compose(trim, len), inc))([' 42 ', 'ABC ', 'x'])",
  fmap(compose(compose(trim, len), inc))([' 42 ', 'ABC ', 'x'])
)

//this is fmap over Maybe
log(
  "fmap(compose(compose(trim, len), inc))(just(' 42 '))",
  fmap(compose(compose(trim, len), inc))(just(' 42 '))
)
//it won't break if we don't provide a value though!
log(
  "fmap(compose(compose(trim, len), inc))(nothing())",
  fmap(compose(compose(trim, len), inc))(nothing())
)

// another simple example

class Either<T> implements Functor<T>{
  value: {msg: string, type: 'left'} | {type: 'right', val: T}
  constructor(msg: string)
  constructor(msg: null, x: T)
  constructor(msg: string | null, x?: T) {
    if (msg === null) this.value = { val: x, type: 'right' }
    else this.value = { type: 'left', msg }
  }

  map<U>(f: (x: T | undefined) => U): Functor<U> {
    if (this.value.type === 'right') return right(f(this.value.val))
    else return left(this.value.msg)
  }

  toString(): string {
    if (this.value.type === 'right')
      return `right(${this.value.val.toString()})`
    else
      return `left(${this.value.msg.toString()})`
  }
}

const left = <T>(msg: string) => new Either<T>(msg)
const right = <T>(val: T) => new Either<T>(null, val)

//this is fmap over Either
log(
  "fmap(compose(compose(trim, len), inc))(right(' 42 '))",
  fmap(compose(compose(trim, len), inc))(right(' 42 '))
)
//this will return argument verbatim
log(
  "fmap(compose(compose(trim, len), inc))(left('Something went wrong'))",
  fmap(compose(compose(trim, len), inc))(left('Something went wrong'))
)
 */
