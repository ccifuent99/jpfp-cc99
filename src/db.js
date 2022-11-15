const Sequelize = require ('sequelize');
const { UUID, UUIDV4, STRING, INTEGER, DECIMAL } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_schools_db');

const Campus = conn.define('campus', {
    id: {
        type: UUID, 
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    name: {
        type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    imageURL: {
        type: STRING,
        allowNull: true
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    detail: {
        type: STRING
    }
});

const Student = conn.define('student', {
    id: {
        type: UUID, 
        defaultValue: UUIDV4,
        primaryKey: true
        
    },
   firstName: {
       type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
   },
   lastName: {
       type: STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
   },
   email: {
       type: STRING,
       allowNull: false,
       validate: {
           notEmpty: true
       }
   },
   imageURL: {
       type: STRING,
       allowNull: true
   },
   gpa: {
       type: DECIMAL,
       validate:{
           min: 0,
           max: 4,
           isDecimal: true
        }
   }
});

Student.belongsTo(Campus, {
    campusId: {
        limit: 1
    }
});

Campus.hasMany(Student);

const seed = async() => {
    try {
    const [soup, stew] = await Promise.all([
            Campus.create({name: 'The Soup School', address: '500 Soup Lane, Soupville, IN, 37617, United States' , detail: 'Dedicated to bringing an air of enrichment and nourishment, The Soup School delivers trained professionals to their career goals!', imageURL: 'https://media.istockphoto.com/photos/modern-high-school-exterior-picture-id498704211?k=6&m=498704211&s=612x612&w=0&h=NU5TEqDPiI8Q-Td-FVn19CBaOairCeSrhP2QLWktbOE='}),
            Campus.create({name: 'Stew College', address: '1000 Stew Street, Stewings, KY, 71673, United States', detail: 'Honored to deliver extraordinary results in fostering student knowledge that truly make a difference', imageURL: 'https://th.bing.com/th/id/OIP.r2MP32a-OmBoJcOZFefZKAHaEK?pid=ImgDet&rs=1'}),
        ]);
        
    const [ DW, JL, NH ] = await Promise.all([ 
            Student.create({firstName: 'Darryl', lastName: 'Whitehead', email: 'dwhitehead@soup.edu', gpa: 3.1, campusId: soup.id}),
            Student.create({firstName: 'Jaime', lastName: 'Lott', email: 'jlott@soup.edu', gpa: 2.5, campusId: soup.id}),
            Student.create({firstName: 'Nafisa', lastName: 'Hooper', email: 'nhooper@stew.edu', gpa: 3.9, campusId: stew.id})
        ]);
    }
    catch(ex){
        console.log(ex);
    }
};

// 'The Soup School', 'Stew College', 'Porridge University', 'Oat Academy', 'The Rice Institute'
//Darryl Whitehead, Jaime Lott, Nafisa Hooper


module.exports = {
    conn,
    Campus,
    Student, 
    seed
};