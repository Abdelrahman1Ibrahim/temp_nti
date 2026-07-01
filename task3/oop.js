class Person {
  #email;
  #id;

  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this.id = id;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (value && value.includes("@")) {
      this.#email = value;
    } else {
      throw new Error("Invalid email format");
    }
  }

  get id() {
    return this.#id;
  }

  set id(value) {
    if (typeof value === "number" && value > 0) {
      this.#id = value;
    } else {
      throw new Error("Invalid ID: Must be a positive number");
    }
  }

  describeRole() {
    return `I am a person named ${this.name}.`;
  }
}

class Principal extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.schoolMembers = [];
  }

  addMember(member) {
    if (member instanceof Person) {
      this.schoolMembers.push(member);
    }
  }

  removeMember(memberId) {
    this.schoolMembers = this.schoolMembers.filter(
      (member) => member.id !== memberId,
    );
  }

  listMembers() {
    return this.schoolMembers;
  }

  describeRole() {
    return `I am the Principal. My name is ${this.name}.`;
  }
}

class Teacher extends Person {
  constructor(name, email, id, subject) {
    super(name, email, id);
    this.subject = subject;
    this.studentGrades = [];
  }

  gradeStudent(studentName, grade) {
    this.studentGrades.push({ studentName, grade });
  }

  listGradedStudents() {
    return this.studentGrades;
  }

  describeRole() {
    return `I am a Teacher. My name is ${this.name} and I teach ${this.subject}.`;
  }
}

class Student extends Person {
  constructor(name, email, id) {
    super(name, email, id);
    this.enrolledSubjects = [];
  }

  enroll(subject) {
    if (!this.enrolledSubjects.includes(subject)) {
      this.enrolledSubjects.push(subject);
    }
  }

  viewEnrolledSubjects() {
    return this.enrolledSubjects;
  }

  describeRole() {
    return `I am a Student. My name is ${this.name}.`;
  }
}

const principal = new Principal("Mr. Ahmed", "ahmed@school.com", 1);
const teacher = new Teacher("Ms. Sara", "sara@school.com", 2, "Mathematics");
const student = new Student("Omar", "omar@student.com", 3);

principal.addMember(teacher);
principal.addMember(student);

teacher.gradeStudent("Omar", "A+");
student.enroll("Mathematics");
student.enroll("Physics");

const allMembers = [principal, teacher, student];

allMembers.forEach((member) => {
  console.log(member.describeRole());
});
