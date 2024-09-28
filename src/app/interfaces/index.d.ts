interface Person {
   fullName: string;
   age: number;
   skills: string[];
}

interface Task {
   id: number;
   title: string;
   dueDate: string;
   isCompleted: boolean;
   people: Person[];
}