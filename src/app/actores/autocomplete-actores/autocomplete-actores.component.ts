import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();
  actores = [
    {nombre: 'Tom Holland', personaje :'', foto: 'data:image/jpeg;base64,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'},
    {nombre: 'Hanks', personaje :'', foto: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgWFhUYGRgZHBweHBoaHBwYHBgcGhoaGhgaGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCs3NDQ0NjQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAQkAvgMBIgACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAAEBQIDBgcBAAj/xAA/EAABAwIEAwYEBAQFAwUAAAABAAIRAwQFEiExQVFhBiJxgZGhMrHB8BNCUtEHcuHxFCMzYoIVNLODorLS1P/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwAEBf/EACQRAAMBAAIDAAICAwEAAAAAAAABAhEDIRIxQRMiMlEEQoEU/9oADAMBAAIRAxEAPwDq2iouDovpXj9kwumP7RNMFYKrS1K6PjjZBWJfT7yDkM0J32souwt4Kb0bCeCubY5Tsk8UUVtDGxo6K+rbqywCYmlI2SVxz9KTzMz1S26Kqnhb3nRpjifDxWkpUGlwkcQPfkibh4BLvADwn6qbmUP+WjF1sHfrDSY5Qfkk1/hrmiXCAdufpwXSKD2wZ24dNyJURQpvzNeAY4aaCYkHfl6orBapnJhZGdlezDDMEarr9pYUmBga1upOsd4SCdDulFWi173jLsZ214gDqi2l8F1szGEYKdNFs8Ow7LwXtk5jSAdCY8NU9oBpgA68k8qWJTZK2pAI9gCpa2FY1yoIfVmJDitDQrQ7pff0pBS1OoaK8Xph3XRaYKg+66ofHRkf4pK+66rlc4zsV6Oatz1QpMpWbnqpNr9VsD5nWa1UCVSbgQsnfdoAXZWnxKLoX+YbruR5jZXj1eAVl7YZnJ9ikuEAJbY2rg7ZamNKHdjQEK+rbhWWbCAiHsJ2Ck6xnTMJoBt2ZSjbi6bkD2kQOW2sD6r6vTaIG+mvIc9PaUnxG7DRlbEGQRER5cktVqEmceBTsSa1r3cQDHieiVuvS85ATpuRvAGw90HbYbUqZgGkA+MJjbYO+mHETJ48p4hSdIqpZZUrFrIO8gQPZvjHueqtpPNNvfMvIzEbnQZi3pMD1S/IabgYnLrB4udsTz4eqHFyTmzmTrJ5mO98gB4JlmAaYyfijxvuQSAOAECem3zU7C+c98HTNOp00EDUeaR1rrudT3eum2vJRszlY92fWIlomNRIEkSNWjT6I4KaYOa52+kDluOHr80U26a+IcQHNBEaHw+XqsnQuBme0bQ4SdDMhxA8gp0LsinRJJLs79tNDp8wgHDe4diOVkOl2UxMyY8TumdrdNeJaZjQ8weoWEt8TDQ8E6ZhHUzrp5/JM8PustTO0wI7zeDv666J5v4xaj6bamVXcs0VdjctqMa9uxHpzBRNQSFUkc77ZWvcJHBc5fddV2LtJa5mOHRcHxdzqdRzTz0SVOjzWDI3fVTZe9VmHXRUP8W5J4jeZral8A7dars9UzRJXMK11LltuzF6IGqpdNLoXihVXZ0Zlu0hestRyVFjdNjUo9tw0rm82dj4kiTKHRDYtcOpMDmtzEuAiYOvLmUxo1QltfEmveMokD4dJ1nWEPPWI+ugd9sXjMWwSCdD8/VVWOC/iO78kdf3T2uDlA4n1TCxAa3RM23iZNdJtF9rYMY2AOChc27TwUnVOapdWlN+uZgJVbuim7wprtgk172f4ARzI8lrgF9kCXxK+X9mCq4CZ1BgD90KcFeIidtuQk/fiZXRX0weClQot2jdDK0zqc3DnFjgz80RpBk9SNT9PNGHBCCNPh2Hz+vquhstWRsFGrat4AIua9gXJO5hzWvgryCQNN410j6lCW149j8jgGgayd3aQP7dF0t9Eclj+02EAkPGhG56fslVNPGO0qXQ0scbZRjWQYlp0MniAthSqBzQ5pBBEgjYhckrUgWQ8N/m2II4ghb/ALJYg19uwAzlaBm/UQIcfGQuiK+HLc52HYlQlpXGu2fZ5z6ksGsrqeN4lrkZuUvpWob3nalVnG8I1q7RyBvYqqRxVdTsZVHA+i6xcXBB7rF80PI1aVd8cJElVNnC7i1I1U8Nu3sO60GKWeSVmamjlytajpisZvcIxJxiXLV2t6ANSuYYVXPNae1rHmuepOyb6No/FQGOI3DTCh2apOJzuAA0jk0fuUktgHNcSHECNp489Nk5wes7KBuJMCNI5lLMpMW3o+/GzvmZA2++KNt6+iWMdv5qyi/RZ1+w0yvEYuqqOdBOf1XrHo6FQMGPU86BbVhSL0PMHgF/iBSa8IFtRSfU0Q8jfjGjKy9qVEpp1+qmLhH8vQr4MYS50oK+phzSCJlXCoqLh6VvopMtMzN/Yh1F7dnDVp4SPlsJ8VDsbeZLckjLDnh3jOnzPqm1c6PbxiR0+/qkeCMBbcMiIId0OaRt5JvJqdQihOmmGOxRheTv1RVtfZzoNOaV2FBgEnZF1seoUhAI8k//AKqXUok/8de2w+vdho+FAVe0MflQ9TtBTe3ugpHcBzzIBSqrr2ZzK9IQY/WWWeySm2IvzFAsC6vSIIssqZCfWoclFGU9w9uonVLmjeTRqOz1u/K9wflGXhE+SOw+rJEN349Ouqtw4A0XwG6wIGkSN+ZRdANawZQIjTmVG+mWj9kXMfqpBD5o4yvXP10XO32dkz0FDqvCeUqmk4opjdk26HMIPcRwUc5jdGsaDwVT7ZLUs00voKKhXpqr00DIjdWm1KTxop5SVfiL1r+qINoOZVLqMcUGmjKpZZSrFfVHzxVDnRuo/iI+Xw3j3oLfVCDIMRP37ILCsoc8D4niOoAk+kyETfPGxjb0S3CKby6REjPJJgxHLjxVp7k5q/WgW6BaxzBvJUsE7LGocz9lfZWrqtXot9aUQxoACMaidi237OU2CA0IqlhDB+UJh+IvA9W6Jaz81vdJVzKS9t7eUxp0FSmRlAtKmZWjwK1dUdka1zjE90SRHFL6dMLSYZWfRphzDlc9xJPMDQDw3U75PFaW4uJ8leKNJh1m2mwh8yTs7TyVlZzT8Pty8UI24/xFMhwhwGp69FTWc6kGMIJnidDrr9+Ki359ouo8HjDxT7qpDIKMpUnOaHN1HPQRG8yosaAdSPUH3Cl40XVznTPGNgSrnVQhalYH8wHSQhzXaNILuZb3vIQjlL4byl+2MaV0rzeAR1Kz1xi1KI+GOB3815/ihLRPX6pXVIpMxRoBczUG2jT8wrxcgu8FnKN3me93AQPPUn5heC+0JB1P0lZWzPhTHle+HBUNuJEnVKLPEGT3iEafw5hrpB26dClbbClK6Ra95OyqD9YV7DlHMc1W6mJ+SUdMDv2kxHt97LzDaZY186HKY38NkW9gkT5f1RNi/MSI1AIPpp9F0cf8Tk5v5EezdLTMdz0grSt1SXAaTgXBwgyU7e8NG6eUQt9nxYvCEK+9HNei4BTukhVFHELeiiHthWWwUnsVmjnlkKQWoo0+4zllHudVm2MWmwZ+ZmU7t+W65v8AIluf+nd/hUp5Hv1DmxoatIIAkSP2jxV+MAk6gaSIP3yQlpWIqNInKdup4eCJxR+jTvO56/cJIeyPyTnJ2Kbi0fVp5KdUse12cT3gYEEBsiRqTClTun29JrqrmVKhmO7lbAMZiwHnIA2lpXsnhulOO0n1NA8NLQANJ5kjwkk+aZW2uxHxJPUSue2FcTD2gcslOPdqXu7ZPB71O2d1czK7TXRzHN5BKH9nQRL3ku8ePgl9x2faJOf0I11Bg6cwE3k/rB4L4jVNx60rwHtqUj+prv8AE055lj++B/I6V7UdlcIc1zXCWPYS5jh0J7zSOLXahYu3w4tPcePA8fRabs7TOV7XAGHscJngHBzf+Xdn+UJaarpjzLntGmtqOSmTmBJMnXWT/b2ScuOYtzgS7QTmdJ4NY3Vxlaj/AKlXbSjJTLYMAtmOesrI373MaXs7lR7hlc0kZGhpz5SdWuJyCZ0BckUzvss7tLtB/wD0SkzWtV/DeRo2rVZTJ8abQ9484Kstqlu0ibqh5C4f75QFhHWJk5y0nXjz49Sg22tZpAadhwMzrxlW2X8OZqk/b/4djt69J2jLqgf5i9nu5GPoEABw31aQ4OBB4tI39VyGnXrMgvaMvMfULdYDetex7C50FsgCRBBElrhrMTt0U6Uv4UnyX0d3VKQS1zTkgubIzAcJaJ3KGubp9NjixvfdBJ3iePsiKFo3TvueYEmZgaOgnj5KzF6QLOct8C3kQeI206LWkp/UPG27/YswS9caRc4y4Tr8kuxG6qu+F0KWEscab8qR4lcXDDAYSp8W0kPzqZtlouK7TqZTuxvnEarM21zWce+yFp8HtzBJG6Zy9FlpLTEWbdFa9q9s2QArntXotHkplLGJrhRyv8dEDTYmNsIIKnUeUtFeOvGkxzTY5whsZmEETtlPFM8RpSwCOW3qhqLxlDgN/uPmjKjDAMcJAHtK5InNR38ta0xKynM8EtvqLpkDTYk8xMe0eiftpRB+9FG5a0yDEJEuxzHXGHA7lwPQpeMJMrY3NKmNnkdCAfeUA5gP52+/7LMy0UW2FNGpTvCsO1yxuZPgo2z2udkZ3ncY1jqtJY0ddvErLvoL67YRWoQyOiwWMW8hpM6OIPRdHqUpELI41ahjjm+B3sfv6INYzRXkjE17E7tUKb3tMZZWhqWhb1HAjUL6jaAmVtHwEsmOdq9k8uid4dRbLnDTSPM8PQH0V9rZucIDSfD90WbcMbl4zJ++i2/QJLcCsMZDZ2AH2Evu7kve+PhAy/18zqnWHghjgNAeJ4FJ322R2QGY3POdQl5NUpB4sdtj7s1a5aUndx9h9lXX2Hl2wCJw4hrGjkEU+sFfjheKOPkunyNiCnhGsuTCjQDdArK1yNhuiLeI1TpToKdZrOXsowvnMR9Smhsi7GcCZ4ymiaTV9SYimU1gjPCgHDKTEEHyTmC4ECBA9PArOWzCSADExr/TitOGQBMxHquapymzpm9lL+gG9DWM4AgdI5mOZSS9udjI13319U0xVuY7SdfX7Kzd/SIOgHnHsoUsOvi9A9xdCEmubsuOVnFSumPc4Nb+b5Dc+GqYYRh7ZMQQNC88TtpzUvFtnS7UoZdmbhlJkH4ie8Tv08loKV23UyFksWw/u93SDEgwdUkp3j6JyOc5w66kdJ4qvi0uiPlNPs6S7EWz8ShcVKbwc0FpGy51VxojafLdeW1xVqOkuIbyHE/UqeU/ZVzKHTq+R7mA90HunmOE9UUy8PTxKW1KcsnWQhadxwKTtFE00aaliLiCAY8NJ8SmFm0vjj13Ajmspb1ytZ2fpuBM7nbjp5ozO0T5H4y8GVdmRktHPT0iVme0V+LekHH435Q3xOnsFpK9y1oAd+Ylv7LmXbK4NSowHZpAA89VWknSRzxTmG/7Oj2N3/lNPQKuviMDdAsaW0WRyCS3l0dlKqaXR1cXHNdsPdi7s8jVWjtA6TIhBYVbZtXIm6tWTuE07gL8dzDyq1Dmmj3sVGReqzwEQphG0QhmtRNEoGDbamc4hOzVECRP3wSag7UJidASeGylfstAHcMGcjjEk7xKV3dPMNQY4aTofr+6LrOAfIJMiY+9h+5VNy0nb9IHmd/fc9Fz2tO3jeNGVxl+R2VoI0kgHmRDVRY3r/1gD735ppjFjLA/jr5xG3oUgfgorMGV7mvHU6jholn+irSbY8qX+aG5wT5RsQd/L0SDEKb3ukiYO49T7klfYfh1duZn4LKhaBBzFjjrvBmTw34JpVwp4J/ya7Dp8JY8EkbaORfkhV4p4+mIalAtd3hIKdYWxjQS8mIG0mOpQlezqxJbWcRMCGDbxelj7q4DixtInQaOIJHPVsgJUtH6f01xrsBAkEERMHUDrz/dButM0OHGZ1HPR33ySKnUqxL2ZRI0mU87OML5JG0wOAkxp98ErQVssJt7ZwkZoO45HiR7e5WywYGTPIb9f7JZQtzOrZAnoRrOvXT26JthxEOPI6R5oxPYnLWpoExyIjiHEj3O65v2k0IdyM+66JjrDIM7j7+YWA7S0+4Uf9yP+pusKqh9Bh6D5IK7sgTKXdhr/NRDSdRp6LSQCpVJ18ddGYvLp7CGtB10TW2wJzmhznEko+paNO4V7Lp7BA2VoSzsSrv1IE5QcxRa9Xs1XoHjFICm1WGmvhTWMXUHpvWqZmztOn90vtaYCNqVWtyt3c6crRuYBLj0AHFSpp9FYlrsWPAB6giAN4MAfNRrOB1O3ATEzoPcL29dDs07bx6BDRnLHHZpB9OJ6f1UqR0SwfGmE02sbL3EwInzPh+6At7eGAaB7eXJasM00AnadPUeyCqWURILiRvx4kkn3UqlrtF+O19FrLlrhDoDhz59DwXtWqf1neZD584I1Vd5h5cDp6zw4BANw6BJcdpga8NBvvv6IOmzomp+lleXD45Gu5jffQL6zexgImT00H9UNWwp0kgnnuduvlvy0Vtna66Aj5k/fy8kjbQ3nOYj2tZh8iJP3wR+EWoYwl4LRz68D1HTojbDDycruIPCeGo0Ox+iYm17hObOHHThqHTv57dEZlshdpMopv2HEHfXKevsjrRsac9UJQga/lgx7IstgGDBDdJ6KiRGn0LMRuc0tiBPuNFj+0LO7C09cySSs9jbJCj5bQzWLBL2cuDRfM90roVrXDoI4rmDwQYCdYHjhYcjymqWxopLo6IWyEBXYQVfh161w3TIBp5LJaN5YzMP0Kvo1V69ipyHgvSPIGLXSnFnhBcMzzlHLj/RAYVZua38R4gD4QeJ5+Csu8eDQZcpVyJdFo4m+w25FCg0ve4kDn8oG5Wc7H3ZvL6tVcO7TpZGt4Nzuj1hp9Vme0GOOquie4Nh9StD/CA926dxzsHkGuj5oTP1mqviPWXeYPa/42S0tj4oMKqg8lwnYaR1n70VnaW2fRrueDDXkuGmmvxekz6Lyg9pHdPe4/7enikx7jLtLE19NBQaCWk8B69fASrXukTH39OCSU7kiACTGnIa6+iYtu+7GWTB359fdH4ItTIsty4HMAJ0jhw+4Q4o5nfAIbp/bz4ow3UNE/F04T/ZU13wwSY2nmYPTb+ilUnRNdkXM7zZEF3HYeJ9QPBE/wDS2gg5dBvz2iUvoYgc2bdr9Y5RAHmmrq86cQ4H0AiBxGh9EqSfsN6swtpu/DfrBDuPH146fJD3ggOa3aZ00+XHVFV6rSNh0+X1S2/q6gDfjrw4J/RJdshRpw7U7jb5lL+0eIOY1oY6HceOhkCekg+ya03AkGNTsOZPALD9tKz6F8aZdLX0muEgfm7rh4ZqchNE6xeWsQPXxa5bvkePDLKEqY01/de0sPXb1UhU0Q1xRDhsD/tO3keBVHww/hFc1L6ePoknM0SDxGqXXtItcCNDKkym9hzUXGBuw8PJFUcUY/uPaA7k7Y+B4JPwr4xvzP6h3hd45jQU7Zjem6QWz2RAXr6U7KNxS+Hbw8sP2zYDIKjWF4MkSRsBOuvOE5ucYtKOgAeRyE+pK54690hugHH+qRYniZf3GGBxPErqxt9nnppI2OM9t3POSkwdOMJFXuTBzvzOO/IdAl9gwMZmO7vZB3VfMdFvFb0byeHlzWmVuf4O19LpvVjvZ4+i509+i1/8JLjLcV2/qY0+jj/9lRIRnTsbshcUi3iNR0K55bPdSeWPIY2YcCNjrx+wuhmtlKV43hbLgTAa8CA7gejhxCXkje17LcXJn616E1zWAgg/FB8J1n3XtO+136zG/NZfFqdam7LUmNAJ2gR8J47IN15VBJa+RwB1XO7S6Z1LibWrs2QxBsmdRPnvofGVC4us7XAu+IDyAnbyhY04jUOpg+yIpYkPzjX5pW0xlDXw01rcAADkI8tfp8kT/j5d3eAhZduKN2213RNPEWCN9dtPfzQwOGmbdknQ6AQPGZ+ak+vrmJ2A159EgdizWwA2dBrPoE87PYc+pD60xuGnSeWnAdFk9eIFSpXkx/gNqXEVHbAdwdP1LE/xloZK9pXA+Jr2O/4lrm//ADeunUdFzj+ODh+Da8xVd6ZF0zPisOG68q0yVOporZS6zfLQUQX6JiZ9cMM5mnX5+KDuaLarZiHD1CLFRUvbrmHmsYCs7l7DldsE4p3h4FLqjQ7vBfAxsiYvuLqdBOUf+49eiGt2y7Xz8OKXmp1V9GvDSeJ0/dEwXdXROg2QheVW+qq3OWMTe+Vof4b3OS9j9THD0IKzJcmvZOuGXtE8CcvqCtuGO4OCg9itZsvE7Ahbe27XtLXtDh11WQxXsyWy6iZH6T9Ct3VYhH01G4Vezp4+Rz6OWvY5hIc0g8iPdSa8cR7LoF7h7Kgh7Z5cx4Hgs/c9mnCSwggfldofXb1XHfC16O6Oea/kZx1XkFNubciBsOZ6AImpSe3QUzPSCPUaAdVpez+AmQ+p3n8Bwb4fukmaZS7iVunnZvACSH1BrwaeHj1W+t6IAQttb5UZqurjnxPO5eR0y3PwC5l/GthNOgTs1x9xC6jb0lhv4v2mazLv0OB91YgvZyjDKhybpk18pHhj4HRNqZjiggMteV7TcvXDRDsOqJj2o2NtlSSr21QSQQqa1PVYwqJU4MKljpKm+oiA9LoXkqOZSlYx4SrbWtkqMf8Aoe0+hVB1UamywUfo6zcHsa8bOaCPMKRCVdjKxfa0yeLAR4EbeRn2Tio1MnqM12UvCpeEQVSWSVgooDJWP7VYwSTRokHKYeQWEz+nLnDoHEgHl0Ol7Q3/AOBSMfG/ut6c3eX7Ll9IfhVXUjne15zNEU3kl2/+oJLi7WZ3ynWFKqW+JRJ+OlzLp+jXOdyynuTtm7rss7/qP/I6LQYbcVqIz0STB71JwOV3HKGxmY+JIbBceZ+FIBbw7I0a6dxoyOI4H8B5LS3umHMOjQXnUrQYQ0ikXDVrWn4TDC2ASwZzmYx234Z4EP4QkzAOmb3s7jFK8pCpSOo0ew/Exw3a4fcp0ykuH4Dd1LW5qXVMkse8hzOD2A6uiB3t3AwNzoJXcMNvmV6batNwc1wkH6HkU00n6BUtdsIY1Zv+IdpnsLkcRTe4eLQXfRamEBjlLPb1mn81N49WFOIfmLDnJg18FKbA6BM2P5oBYW18eBUWnvKqYUXPjVEB7dVQz6cyvbdrokyJ4KtjJOd3edw5N6K4OKxhMDwXgKFbTcNjI5K5lXnp4omL2r47rwOXsrGJFQyr6FIhYx17+HWJD/CU2uPwFzT4Zj/T0W4qMXHewTi6m9vJ59w0rq+D3BfTAd8TO67rGx8xHnKWa+DVPSZJwXrQp1GpJ2nv/wAKllae+/ujoPzH00807eLQJa8Mt2gu/wAeo4g91vdZ4D83mfos5j1qczHkA6lplmcRvq0axpw1Td7IHgve1lFrRTBLQM5MuzAaAx32/Bv8R0XLCdV5HTeTOAZAcyTBYJLpmrSaQJdnb/qW52LnDugZWbynLWTQd+pxAklj3RM61Bq+WjR0S0HIdkkqX1Nm75e3KND/AJjc05MlZkteNTDXjTUmXaB5Zw+k3KR8b5EBsHTMCzdju93p3JzaZoFL9EJWtAdO1EI/s9jZsahmTQee+39BP52j5hTZSQl1QkqMpy9R1VlLGdfoVmvaHNcHNIkEaggry7bLHjm1w9iuedkr99scmrqJPw8WHiW9Oi31Su19Jz2kFpa4g+RXQqTOSpcs/LFAZXObyc4ehTIahB4i3Jc1B/vn1AP1RVF0hFGfskHkeCqqOlWvCHciKX03aK4IRhU85WMKwFImQvivGrGJMEKYcoBSHFExNq9eV8d/JeVN1jG0/hk+X1G9Wn1BH0XUGf5Tw/8AKdHfQ+R+ZXK/4Z/69T+Vnzcuq33+m7wSz7Y79IY1SGgucYaBM8gud4pdmvVc8/Ds0cmjbzO62OMf9m/+Rv0WGYpc9PpFeGV2Wst82nNEY1asfUphwLi0AwIg5y1pl5+BwzMh/wCUvbzRNjwQvar/ALev/L/+ZHjXQvLTMHjtyHVaQbD2MIf3WhtImJMB0Z82QOJJ1c54BC1+EtGdsyXNJYS4ulx7xqOcHd7Wo8N1nvNeA6AAcZ2p/wBep/MP/I5a7BP9Cj/63/lYmfoRezSigNeaoNrLkXR3RB+JKkWbIWNpBVVzfVKD3sYRkeCC08CRGZvVNLTdKMb+MovpdCr9n2ch7U08t0/qGn2j6KFsdkZ22/7r/gz5uQFr9+6efSJ17YS5DVES9D1ERDyivatTXRV0tz4H5K+hx8UDH//Z'},
    {nombre: 'Hiddleston', personaje :'', foto: 'data:image/jpeg;base64,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'},

];

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizarArrastre(event: CdkDragDrop<any[]>){
    const IndicePrevio = this.actoresSeleccionados.findIndex(
        actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados, IndicePrevio, event.currentIndex);
    this.table.renderRows();
  }
}
