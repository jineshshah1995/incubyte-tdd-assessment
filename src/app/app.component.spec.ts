import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'incubyte-tdd-assessment' title`, () => {
    expect(component.title).toEqual('incubyte-tdd-assessment');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, incubyte-tdd-assessment'
    );
  });

  it(`Should call add with`, () => {
    expect(() => component.add('//;\n1;-2;3')).toThrow(
      'negative numbers not allowed -2'
    );
  });


  const successTestCases = [
    { input: '', expected: 0, description: 'empty string' },
    { input: '1', expected: 1, description: 'string with length 1' },
    {
      input: '1,2,3',
      expected: 6,
      description: 'simple comma-separated numbers',
    },
    { input: '1\n2,3', expected: 6, description: 'newline as separator' },
    { input: '//;\n1;2;3', expected: 6, description: 'custom delimiter ;' },
    {
      input: '10\n20,30',
      expected: 60,
      description: 'numbers with newline and comma',
    },
    {
      input: '//|\n1|12|3',
      expected: 16,
      description: 'custom delimiter |',
    },
  ];

  successTestCases.forEach((testCase) => {
    it(`Should call add with ${testCase.description} and expect ${testCase.expected}`, () => {
      const result = component.add(testCase.input);
      expect(result).toBe(testCase.expected);
    });
  });

  const failTestCases = [
    {
      input: '//;\n1;-2;3;-9',
      expected: 'negative numbers not allowed -2,-9',
      description: 'Negative numbers not allowed',
    },
    {
      input: '1,-2,3,-6,-8',
      expected: 'negative numbers not allowed -2,-6,-8',
      description: 'Negative number with default delimiter',
    },
  ];

  failTestCases.forEach((testCase) => {
    it(`Should call add and expect to throw ${testCase.expected}`, () => {
      expect(() => component.add(testCase.input)).toThrow(testCase.expected);
    });
  });

  it('should call onSubmit and expect to call add and assign output', () => {
    const addReturnValue = 6;
    jest.spyOn(component,'add').mockReturnValueOnce(addReturnValue);
    component.onSubmit();
    expect(component.output).toStrictEqual(addReturnValue);
  });

  it('should call onSubmit and expect to call add function successfully', () => {
    const addReturnValue = 6;
    const spy = jest.spyOn(component,'add').mockReturnValueOnce(addReturnValue);
    component.onSubmit();
    expect(component.output).toStrictEqual(addReturnValue);
  });
  
});
