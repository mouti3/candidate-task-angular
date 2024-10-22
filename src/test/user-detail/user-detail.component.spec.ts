import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { userDetailActions } from "src/app/domain/stores/user-detail/actions";
import { UserDetailComponent } from "src/app/user-detail/components/user-detail/user-detail.component";
import { RoleEnum } from "src/generated/models/role.enum";
import { UserInterface } from "src/generated/models/user.interface";

describe('UserDetailComponent', () => {
    let component: UserDetailComponent;
    let fixture: ComponentFixture<UserDetailComponent>;
    let store: MockStore;
    let router: Router;
  
    const initialState = {
      userDetail: {
        loading: false,
        error: null,
        data: null,
      },
    };
  
    const mockUser: UserInterface = {
      id: 1,
      username: 'mouti',
      email: 'mouti@example.com',
      role: RoleEnum.ADMIN,
      birthDate: '1992-03-13T00:00:00Z'
    };
  
    const mockError = { message: 'Error occurred' };
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [UserDetailComponent],
        imports: [RouterTestingModule],
        providers: [
          provideMockStore({ initialState }),
        ],
        schemas: [NO_ERRORS_SCHEMA], 
      }).compileComponents();
  
      store = TestBed.inject(MockStore);  
      router = TestBed.inject(Router);
  
      fixture = TestBed.createComponent(UserDetailComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should display loading state when data is loading', () => {
      store.setState({
        ...initialState,
        userDetail: { loading: true, error: null, data: null },
      });
      fixture.detectChanges();
  
      const loadingElement = fixture.nativeElement.querySelector('div');
      expect(loadingElement.textContent).toContain('...Loading');
    });
  
    it('should display error message when there is an error', () => {
      store.setState({
        ...initialState,
        userDetail: { loading: false, error: mockError, data: null },
      });
      fixture.detectChanges();
  
      const errorElement = fixture.nativeElement.querySelector('div');
      expect(errorElement.textContent).toContain(mockError.message);
    });
  
    it('should display user details when data is available', () => {
      store.setState({
        ...initialState,
        userDetail: { loading: false, error: null, data: mockUser },
      });
      fixture.detectChanges();
  
      const userCardTitle = fixture.nativeElement.querySelector('mat-card-title');
      const userCardSubtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
      const userEmail = fixture.nativeElement.querySelector('p span');
  
      expect(userCardTitle.textContent).toContain(mockUser.username);
      expect(userCardSubtitle.textContent).toContain(mockUser.role);
      expect(userEmail.textContent).toContain(mockUser.email);
    });
  
    it('should toggle edit mode when handleEditMode is called', () => {
      expect(component.isEditMode).toBe(false);
      component.handleEditMode();
      expect(component.isEditMode).toBe(true);
      component.handleEditMode();
      expect(component.isEditMode).toBe(false); 
    });
  
    it('should navigate back when onBackClicked is called', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.onBackClicked();
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  
    it('should dispatch updateUserDetail action when onUpdateUser is called', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const userDetails = mockUser;
      const userId = mockUser.id;
  
      component.onUpdateUser(userId, userDetails);
      expect(dispatchSpy).toHaveBeenCalledWith(
        userDetailActions.updateUserDetail({ userId: `${userId}`, userDetails })
      );
    });
  });