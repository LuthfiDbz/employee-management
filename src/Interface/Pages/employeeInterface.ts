export interface GetEmployeeData {
  id: string,
  ssn: string,
  firstName: string,
  lastName: string,
  age: string,
  email: string,
  phone: string,
  title: string,
  department: string
}

export interface FormEmployee {
  id?: string,
  ssn: string,
  firstName: string,
  lastName: string,
  age: string,
  email: string,
  phone: string,
  title: string,
  department: string
}

export interface BodyModifyEmployee {
  id?: string,
  ssn: string,
  firstName: string,
  lastName: string,
  age: string,
  email: string,
  phone: string,
  company: {
    title: string,
    department: string
  }
}