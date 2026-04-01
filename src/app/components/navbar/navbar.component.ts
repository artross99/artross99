import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";

const BLOW_ANIMATIONS = [
  "blow-soft-right",
  "blow-medium-right",
  "blow-soft-left",
  "blow-medium-left",
];

const COLORS = [
  "linear-gradient(120deg, rgb(255, 189, 189), rgb(227, 170, 181))",
  "linear-gradient(120deg, rgba(255, 183, 197, 0.9), rgba(255, 197, 208, 0.9))",
  "linear-gradient(120deg, rgb(212, 152, 163), rgb(242, 185, 196))",
];

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function randInt(min: number, max: number) {
  return Math.floor(rand(min, max + 1));
}

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild("navbarRef") navbarRef!: ElementRef<HTMLDivElement>;

  private timeouts: ReturnType<typeof setTimeout>[] = [];

  ngAfterViewInit() {
    const navbar = this.navbarRef.nativeElement;

    const spawnPetals = (index = 0) => {
      const petal = document.createElement("div");
      petal.className = "sakura";

      const width = randInt(8, 14);
      const height = randInt(8, 14);
      const left = rand(-100, window.innerWidth + 50);
      const marginTop = -rand(15, 35);
      const fallDuration = rand(6, 12);
      const blowName = BLOW_ANIMATIONS[randInt(0, BLOW_ANIMATIONS.length - 1)];
      const blowDuration = rand(12, 30);
      const swayIndex = randInt(0, 8);
      const swayDuration = rand(2, 4);
      const color = COLORS[randInt(0, COLORS.length - 1)];
      const borderRadius = `${randInt(14, 22)}px ${randInt(1, 3)}px`;

      petal.style.cssText = `
        background: ${color};
        animation:
          ${fallDuration}s linear 0s 1 normal none running fall,
          ${blowDuration}s linear 0s infinite normal none running ${blowName},
          ${swayDuration}s linear 0s infinite normal none running sway-${swayIndex};
        border-radius: ${borderRadius};
        height: ${height}px;
        left: ${left}px;
        margin-top: ${marginTop}px;
        width: ${width}px;
      `;

      navbar.appendChild(petal);
      const t = setTimeout(() => petal.remove(), fallDuration * 1000);
      this.timeouts.push(t);

      setTimeout(() => spawnPetals(index + 1), 200);
    };

    spawnPetals();
  }

  ngOnDestroy() {
    this.timeouts.forEach((t) => clearTimeout(t));
    const navbar = this.navbarRef?.nativeElement;
    if (navbar) {
      navbar.querySelectorAll(".sakura").forEach((p) => p.remove());
    }
  }
}
