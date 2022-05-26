import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UbsAdminTariffsStationPopUpComponent } from './ubs-admin-tariffs-station-pop-up.component';
import { LocalStorageService } from '@global-service/localstorage/local-storage.service';
import { TariffsService } from '../../../services/tariffs.service';

describe('UbsAdminTariffsStationPopUpComponent', () => {
  let component: UbsAdminTariffsStationPopUpComponent;
  let fixture: ComponentFixture<UbsAdminTariffsStationPopUpComponent>;

  const matDialogRefMock = jasmine.createSpyObj('matDialogRefMock', ['close']);

  const mockedData = {
    headerText: 'station',
    edit: false
  };

  const fakeStation = {
    id: 1,
    name: 'fakeStation'
  };

  const tariffsServiceMock = jasmine.createSpyObj('tariffsServiceMock', ['getAllStations', 'addStation', 'editStation']);
  tariffsServiceMock.getAllStations.and.returnValue(of([fakeStation]));
  tariffsServiceMock.addStation.and.returnValue(of());
  tariffsServiceMock.editStation.and.returnValue(of());

  const localStorageServiceStub = () => ({
    firstNameBehaviourSubject: { pipe: () => of('fakeName') }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UbsAdminTariffsStationPopUpComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: LocalStorageService, useFactory: localStorageServiceStub },
        { provide: TariffsService, useValue: tariffsServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: mockedData },
        FormBuilder
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbsAdminTariffsStationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if station exist', () => {
    component.stations = [fakeStation];
    component.name.setValue('fakeStation');
    expect(component.stationExist).toEqual(true);
  });

  it('should check if station exist', () => {
    component.stations = [fakeStation];
    component.name.setValue('newStation');
    expect(component.stationExist).toEqual(false);
  });

  it('should return id of selected station', () => {
    const eventMock = {
      option: {
        value: 'fakeStation'
      }
    };
    component.stations = [fakeStation];
    component.selectedStation(eventMock);
    expect(component.currentId).toEqual(1);
  });

  it('should has correct data', () => {
    expect(component.data.edit).toEqual(false);
    expect(component.data.headerText).toEqual('station');
  });

  it('should call getting station in OnInit', () => {
    const spy = spyOn(component, 'getReceivingStation');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should get all stations', () => {
    component.getReceivingStation();
    expect(component.stations).toEqual([fakeStation]);
  });

  it('should add a new station', () => {
    component.addStation();
    expect(tariffsServiceMock.addStation).toHaveBeenCalled();
  });

  it('should edit the station', () => {
    component.editStation();
    expect(tariffsServiceMock.editStation).toHaveBeenCalled();
  });

  it('method onNoClick should invoke destroyRef.close()', () => {
    component.onNoClick();
    expect(matDialogRefMock.close).toHaveBeenCalled();
  });

  it('destroy Subject should be closed after ngOnDestroy()', () => {
    const destroy = 'destroy';
    component[destroy] = new Subject<boolean>();
    spyOn(component[destroy], 'unsubscribe');
    component.ngOnDestroy();
    expect(component[destroy].unsubscribe).toHaveBeenCalledTimes(1);
  });
});
