import { EmailInterface } from "src/generated/models/getEmailsResponse.interface";
import { RoleInterface } from "src/generated/models/getRolesResponse.interface";
import { UserNameInterface } from "src/generated/models/getUserNamesResponse.interface";
import { RoleEnum } from "src/generated/models/role.enum";

export class FilterMapper {
    static mapUsernamesData(users: UserNameInterface[]): string[] {
      return users
        .map((user) => this.mapToUsername(user))
        .filter((value, index, self) => self.indexOf(value) === index);
    }
  
    static mapEmailsData(users: EmailInterface[]): string[] {
      return users
        .map((user) => this.mapToEmail(user))
        .filter((value, index, self) => self.indexOf(value) === index);
    }
  
    static mapRolesData(users: RoleInterface[]): string[] {
      return users
        .map((user) => this.mapToRole(user))
        .filter((value, index, self) => self.indexOf(value) === index);
    }
  
    static mapToUsername(user: UserNameInterface): string {
      return user.username;
    }
  
    static mapToEmail(user: EmailInterface): string {
      return user.email;
    }
  
    static mapToRole(user: RoleInterface): RoleEnum {
      return user.role;
    }
  }