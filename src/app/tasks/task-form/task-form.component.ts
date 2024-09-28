import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
	selector: 'app-task-form',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
	],
	templateUrl: './task-form.component.html',
	styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit {

	taskForm: FormGroup;
	taskToEdit: Task | null;

	constructor(
		private fb: FormBuilder,
		private taskService: TasksService,
		public dialogRef: MatDialogRef<TaskFormComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Task | null
	) {
		this.taskToEdit = data;
		this.taskForm = this.fb.group({
			id: [Math.floor(Math.random() * 1000)],
			title: ['', Validators.required],
			dueDate: ['', Validators.required],
			people: this.fb.array([], Validators.required),
			isCompleted: [false],
		});

	}

	ngOnInit() {
		if (this.taskToEdit) {
			this.initializeForm(this.taskToEdit);
		}
	}

	initializeForm(task: Task) {
		this.taskForm.patchValue(task);
		const peopleArray = this.people;
		peopleArray.clear();

		task.people.forEach(person => {
			const personGroup = this.fb.group({
				fullName: [person.fullName, [Validators.required, Validators.minLength(5), this.uniqueFullNameValidator()]],
				age: [person.age, [Validators.required, Validators.min(18)]],
				skills: this.fb.array(person.skills.map(skill => this.fb.control(skill, Validators.required)), this.requiredSkillValidator())
			});
			peopleArray.push(personGroup);
		});
	}

	get people(): FormArray {
		return this.taskForm.get('people') as FormArray;
	}

	addPerson() {
		const personGroup = this.fb.group({
			fullName: ['', [Validators.required, Validators.minLength(5), this.uniqueFullNameValidator()]],
			age: [, [Validators.required, Validators.min(18)]],
			skills: this.fb.array([], this.requiredSkillValidator()),
		});

		this.people.push(personGroup);
	}

	getSkills(personIndex: number): FormArray {
		return this.people.at(personIndex).get('skills') as FormArray;
	}

	addSkillToPerson(personIndex: number) {
		const skills = this.getSkills(personIndex);
		skills.push(this.fb.control('', Validators.required));
	}

	removeSkillFromPerson(personIndex: number, skillIndex: number) {
		const skills = this.getSkills(personIndex);
		skills.removeAt(skillIndex);
	}

	removePerson(index: number) {
		this.people.removeAt(index);
	}

	submitTask() {
		if (this.taskForm.valid) {
			const taskValue = this.taskForm.value;

			if (this.taskToEdit) {
				this.taskService.updateTask({ ...taskValue });
			} else {
				this.taskService.addTask(taskValue);
			}

			this.onClose();
		}
	}


	uniqueFullNameValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const fullName = control.value;
			const existingNames = this.people.controls.map(person => person.get('fullName')?.value);
			const isDuplicate = existingNames.filter(name => name === fullName).length > 1;

			return isDuplicate ? { duplicateName: true } : null;
		};
	}

	requiredSkillValidator(): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const skillsArray = control as FormArray;
			const hasSkills = skillsArray.length > 0;
			return hasSkills ? null : { requiredSkill: true };
		};
	}

	onClose(): void {
		this.dialogRef.close();
	}
}
