import { ComponentFixture, TestBed } from "@angular/core/testing";
import { UsersComponent } from "src/app/users/components/users/users.component";
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { filterActions } from "src/app/domain/stores/filters/actions";
import { usersActions } from "src/app/domain/stores/users/actions";


describe('UsersComponent', () => {
    let component: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let store: MockStore;
    let router: Router;
  
    const initialState = {
      filters: {
        loading: false,
        error: null,
        data: [],
      },
      users: {
        loading: false,
        error: null,
        data: null,
      },
    };
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [UsersComponent],
        imports: [RouterTestingModule],
        providers: [
          provideMockStore({ initialState }), 
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
  
      store = TestBed.inject(MockStore);
      router = TestBed.inject(Router); 
  
      fixture = TestBed.createComponent(UsersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  
    it('should dispatch getAllFilters on init', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalledWith(filterActions.getAllFilters());
    });
  
    it('should dispatch getUsers on init with proper params', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      component.ngOnInit();
      expect(dispatchSpy).toHaveBeenCalledWith(usersActions.getUsers({ paramsUrl: '?limit=10&skip=0' }));
    });
  
    it('should navigate to the selected user on onSelectUser call', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const userId = '123';
      component.onSelectUser(userId);
      expect(navigateSpy).toHaveBeenCalledWith(['/users', userId]);
    });
  
    it('should update pagination and dispatch getUsers on pagination change', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const pagination = { pageSize: 20, pageNumber: 2 };
  
      component.onPaginationHandler(pagination);
      
      expect(component.pageSize).toBe(20);
      expect(component.pageNumber).toBe(2);
      expect(dispatchSpy).toHaveBeenCalledWith(usersActions.getUsers({ paramsUrl: '?limit=20&skip=40' }));
    });
  
    it('should update filterParams and dispatch getUsers on filter change', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const filter = { key: 'username', value: 'john' };
  
      component.onFilterHandler(filter);
  
      expect(component.filterParams).toBe('/filter?key=username&value=john');
      expect(dispatchSpy).toHaveBeenCalledWith(usersActions.getUsers({ paramsUrl: '/filter?key=username&value=john&limit=10&skip=0' }));
    });
  
    it('should reset filterParams and dispatch getUsers when filter key is "none"', () => {
      const dispatchSpy = spyOn(store, 'dispatch');
      const filter = { key: 'none', value: '' };
  
      component.onFilterHandler(filter);
  
      expect(component.filterParams).toBe('');
      expect(dispatchSpy).toHaveBeenCalledWith(usersActions.getUsers({ paramsUrl: '?limit=10&skip=0' }));
    });
  
    it('should display loading state when data is loading', () => {
      store.setState({
        ...initialState,
        users: { loading: true, error: null, data: null }
      });
      fixture.detectChanges();
  
      const loadingElement = fixture.nativeElement.querySelector('div');
      expect(loadingElement.textContent).toContain('...Loading');
    });
  
    it('should display error message when there is an error', () => {
      const error = { message: "Error occurred" };
      store.setState({
        ...initialState,
        users: { loading: false, error: error, data: null }
      });
      fixture.detectChanges();
  
      const errorElement = fixture.nativeElement.querySelector('div');
      console.log("🚀 ~ it ~ errorElement:", errorElement.textContent)
      
      expect(errorElement.textContent).toContain(error.message);
    });
  });