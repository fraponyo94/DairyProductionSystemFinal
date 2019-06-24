
class cattle {   
        public cowTag: string;
        public name: string;
        public dateAcquired: string;
        public breed: breed[];
        
  
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
        public breed: string;
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
    costOfTreatment: number;
    cowhealth: cattle[];
    calf: calf[];


}



class milking {
    cow: cattle[];
    date: Date;
    firstMilking: number;
    secondMilking: number;
    otherMilking: number;
    // total: number;
    unitsSold: number;
    pricePerUnit: number;

}

class mortality {
    cow: cattle[];
    calf: calf[];
    postMortemreport: string;
    findings: string;
    date: Date;
   

}


class expenses {
    itemName: string;
    quantity: number;
    pricePerUnit: number;
    remarks: string;
    date: Date;

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

class milkRecords {
    date: string;
    firstMilking: number;
    secondMilking: number;
    otherMilking: number;
    total: number;
    remarks: string;
    cow: cattle[];

}





export { cattle, CattleData,breed,calf,breeding,health,milking,mortality,expenses,Employee,Account,Role,milkRecords };