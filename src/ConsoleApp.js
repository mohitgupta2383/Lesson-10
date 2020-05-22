const readline = require('readline');
const path = require("path");
const { StudentDataReader ,TeacherDataReader } = require("./DataLayer");
const { Student } = require("./Models")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../","JSONData");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
    const _taecherDataReader = new TeacherDataReader(path.join(baseFilePath, "teachers.json"));

    console.log(_studentDataReader.getArrayFromFile());
    console.log(_taecherDataReader.getArrayFromFile());

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above; ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Student");
                console.log("[2] Seatrch For Student");
                console.log("[3] Upadte Student");
                console.log("[4] Delete Student");
                console.log("[5] Go Back");
                let userInputStudent = await askQuestion ("Select an option from above;");
                switch (userInputStudent){
                    case "1":
                        let studentFirstName = await askQuestion("Enter Student First Name; ");
                        let studentLastName = await askQuestion ("Enter Student Last Name; ");
                        let studentAge = await askQuestion("Enter Student age; ");
                        // let parseStudentAge = parseint(studentAge);
                        let grades = await askQuestion ("Enter Student Grades (Space-Separated);");
                        let teacherID = await askQuestion ("Enter teacher ID; ");
                        let parseGrades = grades.split(" ")
                        let newStudent = new Student(studentFirstName, studentLastName, studentAge, parseGrades, teacherID)
                        _studentDataReader.addStudent(newStudent)

                }
        }
    }
}

Program().then(() => {
    process.exit(0);
});