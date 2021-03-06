import { NgModule } from '@angular/core';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedMainModule } from '@shared/shared-main.module';
import { HomepageComponent, EcoEventsComponent, StatRowComponent, StatRowsComponent, SubscribeComponent } from './components';
import { EcoEventsItemComponent } from './components/eco-events/eco-events-item/eco-events-item.component';
import { SharedModule } from 'src/app/shared/shared.module';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [HomepageComponent, EcoEventsComponent, StatRowComponent, StatRowsComponent, SubscribeComponent, EcoEventsItemComponent],
  imports: [CommonModule, CoreModule, SharedMainModule, SharedModule, SwiperModule],
  exports: [HomepageComponent, EcoEventsComponent, StatRowComponent, StatRowsComponent, SubscribeComponent, EcoEventsItemComponent],
  providers: []
})
export class HomeModule {}
