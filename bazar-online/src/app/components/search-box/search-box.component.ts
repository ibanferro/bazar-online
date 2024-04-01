import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {

  @Output() private filterTextEE: EventEmitter<string> = new EventEmitter<string>();

  formGroup: FormGroup;

  constructor(
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      search: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)])
    });
  }

  filterProduct() {

    if (!this.formGroup.valid) return this.formGroup.reset()

    const filterText: string = this.normalizeSearchText(this.formGroup.get('search')?.value);
    if(!!filterText) this.router.navigate(['/items/search', filterText]);

    this.formGroup.reset();

  }

  normalizeSearchText( searchText: string): string {
    return searchText.trim().toLowerCase();
  }


}
