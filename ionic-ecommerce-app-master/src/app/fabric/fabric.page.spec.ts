import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FabricPage } from './fabric.page';

describe('FabricPage', () => {
  let component: FabricPage;
  let fixture: ComponentFixture<FabricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FabricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
