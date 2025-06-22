use ic_cdk::export::candid::{CandidType, Deserialize};
use ic_cdk_macros::{init, update, query};
use std::cell::RefCell;
use std::collections::HashMap;


#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Student {
    pub name: String,
    pub total_marks: u32,
    pub num_subjects: u32,
    pub average: f32,
    pub grade: String,
}

thread_local! {
    static STUDENT_DB: RefCell<HashMap<String, Student>> = RefCell::new(HashMap::new());
}

#[init]
fn init() {
    ic_cdk::println!("Student Report Card Canister Initialized");
}

#[update]
fn add_student(name: String, total_marks: u32, num_subjects: u32) {
    let avg = total_marks as f32 / num_subjects as f32;
    let grade = assign_grade(avg);

    let student = Student {
        name: name.clone(),
        total_marks,
        num_subjects,
        average: avg,
        grade,
    };

    STUDENT_DB.with(|db| {
        db.borrow_mut().insert(name, student);
    });
}

#[query]
fn get_student(name: String) -> Option<Student> {
    STUDENT_DB.with(|db| db.borrow().get(&name).cloned())
}

#[update]
fn update_marks(name: String, new_total: u32) {
    STUDENT_DB.with(|db| {
        if let Some(student) = db.borrow_mut().get_mut(&name) {
            student.total_marks = new_total;
            student.average = new_total as f32 / student.num_subjects as f32;
            student.grade = assign_grade(student.average);
        }
    });
}

#[update]
fn delete_student(name: String) {
    STUDENT_DB.with(|db| {
        db.borrow_mut().remove(&name);
    });
}

fn assign_grade(avg: f32) -> String {
    if avg >= 90.0 {
        "A".to_string()
    } else if avg >= 75.0 {
        "B".to_string()
    } else if avg >= 60.0 {
        "C".to_string()
    } else {
        "D".to_string()
    }
}
