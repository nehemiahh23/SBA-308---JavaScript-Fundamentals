// The provided course information.
const CourseInfo = {
	id: 451,
	name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
	id: 12345,
	name: "Fundamentals of JavaScript",
	course_id: 451,
	group_weight: 25,
	assignments: [
	  {
		id: 1,
		name: "Declare a Variable",
		due_at: "2023-01-25",
		points_possible: 50
	  },
	  {
		id: 2,
		name: "Write a Function",
		due_at: "2023-02-27",
		points_possible: 150
	  },
	  {
		id: 3,
		name: "Code the World",
		due_at: "3156-11-15",
		points_possible: 500
	  }
	]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
	{
	  learner_id: 125,
	  assignment_id: 1,
	  submission: {
		submitted_at: "2023-01-25",
		score: 47
	  }
	},
	{
	  learner_id: 125,
	  assignment_id: 2,
	  submission: {
		submitted_at: "2023-02-12",
		score: 150
	  }
	},
	{
	  learner_id: 125,
	  assignment_id: 3,
	  submission: {
		submitted_at: "2023-01-25",
		score: 400
	  }
	},
	{
	  learner_id: 132,
	  assignment_id: 1,
	  submission: {
		submitted_at: "2023-01-24",
		score: 39
	  }
	},
	{
	  learner_id: 132,
	  assignment_id: 2,
	  submission: {
		submitted_at: "2023-03-07",
		score: 140
	  }
	}
  ];
  
  function getLearnerData(course, ag, submissions) {
	const learner_ids = new Set()
	const assignments = ag.assignments.filter(a => a.due_at.slice(0, 4) <= 2025)
	let maxScore = 0
	const result = []

	// gather all unique learner ids
	for (sub of submissions) {
		learner_ids.add(sub.learner_id)
	}
	
	// construct learner objs from unique ids
	for (let i = 0; i < learner_ids.size; i++) {
		result.push({
			id: Array.from(learner_ids)[i],
			scores: [],
		})
	}

	// add scores to learner objs, deducting points for lateness AND calculate learner grades for each assignment submission
	for (sub of submissions) {
		const assignment = assignments.find(obj => obj.id === sub.assignment_id)
		if (!assignment) { continue }

		let late = false
		const due = assignment.due_at.split("-")
		const date = sub.submission.submitted_at.split("-")
		while (date.length > 0) {
			date[0] > due[0] ? late = true: null
			due.shift()
			date.shift()
		}

		const learner = result.find(obj => obj.id === sub.learner_id)
		let score = sub.submission.score
		late ? score -= assignment.points_possible * 0.1 : null

		// learner.scores ? null : learner.scores = []
		learner.scores.push(score)
		learner[assignment.id] ? null : learner[assignment.id] = score / assignment.points_possible
	}

	// calculate max score for weighted avgs
	for (let i = 0; i < assignments.length; i++) {
		maxScore += assignments[i].points_possible
	}

	// for (learner of result) {

	// }

	return result
  }
  
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions))

  /* 
	step 1: loop thru learner submissions, create learner objs in result arr w/ids only
	step 2: store total points possible by looping assignment group
  		ISSUE: look at canvas again to figure weighted avg algo
	step 3: ISSUE: need individual assignment percentages
  		solution?: handle everything in score population loop

	OPT:
	- confirm ag course_id matches courseinfo id
  */
  
//   const result = [
// 	{
// 	  id: 125,
// 	  avg: 0.985, // (47 + 150) / (50 + 150)
// 	  1: 0.94, // 47 / 50
// 	  2: 1.0 // 150 / 150
// 	},
// 	{
// 	  id: 132,
// 	  avg: 0.82, // (39 + 125) / (50 + 150)
// 	  1: 0.78, // 39 / 50
// 	  2: 0.833 // late: (140 - 15) / 150
// 	}
//   ];