module.exports = {

    'male_first_name': function () {
        var names = ['James', 'John', 'Robert', 'Michael', 'William', 'David',
            'Richard', 'Charles', 'Joseph', 'Thomas', 'Christopher', 'Daniel',
            'Paul', 'Mark', 'Donald', 'George', 'Kenneth', 'Steven', 'Edward',
            'Brian', 'Ronald', 'Anthony', 'Kevin', 'Jason', 'Matthew', 'Gary',
            'Timothy', 'Jose', 'Larry', 'Jeffrey', 'Frank', 'Scott', 'Eric'];
        return this.pickOne(names);
    },

    'female_first_name': function () {
        var names = ['Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth',
            'Jennifer', 'Maria', 'Susan', 'Margaret', 'Dorothy', 'Lisa', 'Nancy',
            'Karen', 'Betty', 'Helen', 'Sandra', 'Donna', 'Carol', 'Ruth', 'Sharon',
            'Michelle', 'Laura', 'Sarah', 'Kimberly', 'Deborah', 'Jessica',
            'Shirley', 'Cynthia', 'Angela', 'Melissa', 'Brenda', 'Amy', 'Anna'];
        return this.pickOne(names);
    },

    'last_name': function () {
        var names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller',
            'Davis', 'Garcia', 'Rodriguez', 'Wilson', 'Martinez', 'Anderson',
            'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson',
            'Thompson', 'White', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark',
            'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen'];
        return this.pickOne(names);
    },

    'name': function (middle) {
        return (this.bool() ? this.male_first_name() : this.female_first_name()) +
            ' ' +
            (middle ? middle : '') +
            ' ' +
            this.last_name();
    },

    'femaleFirstName': this.female_first_name,

    'maleFirstName': this.male_first_name,

    'lastName': this.last_name
};