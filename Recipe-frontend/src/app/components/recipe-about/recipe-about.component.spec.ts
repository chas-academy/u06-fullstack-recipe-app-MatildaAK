import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeAboutComponent } from './recipe-about.component';

describe('RecipeAboutComponent', () => {
  let component: RecipeAboutComponent;
  let fixture: ComponentFixture<RecipeAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
