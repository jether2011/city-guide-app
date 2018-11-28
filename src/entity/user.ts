export class User {
    private id?:any;
    private email?: string;
    private password?: string;
    private firstName?: string;
    private lastName?: string;
    private created?: Date;
    private profilePicture: string;

    constructor(id: any, email: string, password: string
        , firstName: string, lastName: string, date: Date, profilePicture: string) {
        this.id = id ? id : null;
        this.email = email ? email : null;
        this.password = password ? password : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.created = date ? date : null;
        this.profilePicture = profilePicture ? profilePicture : null;
    }

    get getId():any {
        return this.id;
    }

    get getEmail():string {
        return this.email;
    }

    get getPassword():string {
        return this.password;
    }

    get getFirstName():string {
        return this.firstName;
    }

    get getLastName():string {
        return this.lastName;
    }

    get getCreated():Date {
        return this.created;
    }

    get getProfilePicture():string {
        return this.profilePicture;
    }
}