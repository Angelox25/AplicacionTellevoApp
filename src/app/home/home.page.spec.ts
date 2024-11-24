import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        {
        //permite acceder a los parámetros de la URL
          provide: ActivatedRoute,
          useValue: {
            // Simula queryParams u otros valores que necesites para la prueba
            queryParams: of({ exampleParam: 'testValue' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Prueba carga de la pagina de Inicio (Home)', () => {
    expect(component).toBeTruthy();
  });
});