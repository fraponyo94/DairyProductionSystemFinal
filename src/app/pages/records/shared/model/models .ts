
class cattle {   
        public cowTag: string;
        public name: string;
        public dateAcquired: string;
        public breed: breed[];
        public calf: calf[];
        
  
  }
  

class breed {
    name: string;
}


class calf {
    calfId: string;
    dateOfCalving: string;
    sex: string;
    breed: breed[];
    cow: cattle[];
    remarks: string;

}

class CattleData {    
        public cowTag: string;
        public name: string;
        public dateAcquired: string;
        public breed: breed[];
        public calf: calf[];
   
  } 

  
class breeding {
  
    date: Date;  
    dueDate: Date;
    methodOfInsemination: string;
    reproductiveCondition: string;    
    reproductiveTreatment: string;
    cow: cattle[];
}


class health {
    date: Date;
    history: string;
    symptoms: string;
    diagnosis: string;
    treatment: string;
    remarks: string;
    nameOfveterinaryDoctor: string;
    contactOfVeterinaryDoctor: number;  
    cowhealth: cattle[];
    calf: calf[];


}

class milking {
    id: number;
    cow: cattle[];
    date: Date;
    firstMilking: number;
    secondMilking: number;
    otherMilking: number;
    remarks: string;

}

class mortality {
    cow: cattle[];
    calf: calf[];
    postMortemreport: string;
    findings: string;
    date: Date;   

}

enum authorities {
    employee ='ROLE_EMPLOYEE',
    Admin ='ROLE_ADMIN'
}




class Employee {
    employeeId: number;
    name: string;
    email: string;
    phoneNumber: number;
    dateOfEmployment: Date;
    dateOfDismissal: Date;   
    account: Account;
   

}

class Account{
    enabled: boolean;
    roles: Role[];
    resetToken: string;
}

class Role{
    name: string;
}






export { cattle, CattleData,breed, authorities, calf,breeding,health,milking,mortality,Employee,Account,Role };