<script>
    document.getElementById('studentForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const studentId = document.getElementById('studentId').value;
        const student = students.find(student => student.id === studentId);
        const resultContainer = document.getElementById('resultContainer');
        const signatureContainer = document.getElementById('signatureContainer');

        if (student) {
            let totalMarks = 0;
            let obtainedMarks = 0;

            let resultHTML = `<h3>Student Details:</h3>
                <p><strong>Name:</strong> ${student.name}</p>
				<p><strong>Date of Birth:</strong> ${student.dob}</p>
                <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                <p><strong>Year:</strong> ${student.year}</p>
                <p><strong>Class:</strong> ${student.class}</p>
                <h3>Gradesheet:</h3>
                <table>
                    <tr>
                        <th>Subject</th>
                        <th>Full Marks</th>
                        <th>Obtained Marks</th>
                        <th>Grade</th>
                    </tr>`;

            for (const subject in student.subjects) {
                const marks = student.subjects[subject];
                obtainedMarks += marks;
                totalMarks += 100;
                const grade = getGrade(marks);
                resultHTML += `
                    <tr>
                        <td>${subject}</td>
                        <td>100</td>
                        <td>${marks}</td>
                        <td>${grade}</td>
                    </tr>`;
            }

            const percentage = (obtainedMarks / totalMarks) * 100;
            const gpa = calculateGPA(percentage);
            const overallGrade = getGrade(percentage);

            resultHTML += `
                <tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td><strong>${obtainedMarks} / ${totalMarks}</strong></td>
                </tr>
                </table>
                <h3>Result:</h3>
                <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
                <p><strong>GPA:</strong> ${gpa}</p>
                <p><strong>Grade:</strong> ${overallGrade}</p>
                <p><strong>Status:</strong> ${percentage >= 40 ? 'Pass' : 'Fail'}</p>`;

            resultContainer.innerHTML = resultHTML;

            // Show the signature container
            signatureContainer.style.display = 'flex';
        } else {
            resultContainer.innerHTML = '<p>Student not found. Please check the ID and try again.</p>';

            // Hide the signature container
            signatureContainer.style.display = 'none';
        }
    });

    function getGrade(marks) {
        if (marks >= 90) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 70) return 'B+';
        if (marks >= 60) return 'B';
        if (marks >= 50) return 'C+';
        if (marks >= 40) return 'C';
        return 'F';
    }

    function calculateGPA(percentage) {
        if (percentage >= 90) return '4.0';
        if (percentage >= 80) return '3.6';
        if (percentage >= 70) return '3.2';
        if (percentage >= 60) return '2.8';
        if (percentage >= 50) return '2.4';
        if (percentage >= 40) return '2.0';
        return '0.0';
    }
</script>
