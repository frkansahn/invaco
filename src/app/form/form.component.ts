import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogService } from './../components/confirm/confirm.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { WorkExperience } from './../models/WorkExperienceDto';
import { EducationInfo } from './../models/EducationInfoDto';
import { ForeignLanguage } from './../models/LanguageDto';
import countries from '../../assets/json/countries.json'
import university from '../../assets/json/university.json'
import faculty from '../../assets/json/faculty.json'
import departments from '../../assets/json/departments.json'


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    standalone: true,
    imports: [
        FontAwesomeModule,
        EditorModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        NgSelectModule,
        NgbRatingModule
    ],
    providers: [ConfirmDialogService],
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    ozet!:any;
    is_deneyimi!:Array<WorkExperience>;
    egitim_bilgileri!:Array<EducationInfo>;
    yabanci_dil!:Array<ForeignLanguage>;

    faculties!: any;
    departments!: any;

    positionList = ["Yazılım","Sürücü","Öğretmen","Hemşire","Doktor","Şoför"];
    sectorList = ["Bilişim","Tekstil","Hizmet","Gıda","Eğitim"];
    businessAreaList = ["Satış","Pazarlama","Akademik","Analiz","Arge"];
    wayOfWorkingList = ["Serbest","Yarı Zamanlı","Dönemsel","Stajyer","Tam Zamanlı","Gönüllü"];
    educationStatusList = ["Lise","Ön Lisans", "Lisans","Yüksek Lisans","Doktora"];
    gradingSystemList = [4,5,10,100];
    educationTypeList = ["Açık Öğretim","İkinci Öğretim","Örgün Öğretim","Uzaktan Öğretim"];
    educationLanguageList = ["Türkçe","İngilizce","Fransızca"];
    scholarshipTypeList = ["Burs Yok","Destek Bursu","Başarı Bursu","Üstün Bursu"];
    highSchoolTypeList = ["AçıkÖğretim Lisesi", "Adalet Meslek Lisesi","Akşam Lisesi","Fen Lisesi","Anadolu Lisesi"];
    highSchoolDepartmentList = ["Acil Tıp Teknisyenliği","Adalet","Ağ İşletmeciliği"];
    foreignLanguageList = ["Türkçe","İngilizce","Fransızca","İtalyanca","Almanca"];
    foreignLanguageLevelList = [
        {
            name:"Başlangıç",
            value:1
        },
        {
            name:"Temel",
            value:2
        },
        {
            name:"Orta",
            value:3
        },
        {
            name:"İyi",
            value:4
        },
        {
            name:"İleri",
            value:5
        }
    ];
    countryList!:any;
    provinceList!:any;
    universityList!:any;
    facultyList!:any;
    departmentList!:any;

    isAddEditCv = {
        is_deneyimi: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                firmaAdi:'',
                pozisyon:undefined,
                baslangicTarihi:'',
                bitisTarihi:'',
                halaCalisiyorum:false,
                firmaSektoru:undefined,
                isAlani:undefined,
                calismaSekli:undefined,
                ulke:undefined,
                il:undefined,
                isTanimi:''
            }
        },
        egitim_bilgileri: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                egitim_durumu: undefined,
                baslangicTarihi: '',
                bitisTarihi: '',
                devamEdiyorum: false,
                terk: false,
                diploma_not_sistemi: undefined,
                diploma_notu: undefined,
                lise: undefined,
                lise_tipi: undefined,
                lise_bolum: undefined,
                universite: undefined,
                fakulte: undefined,
                bolum: undefined,
                ogretim_tipi: undefined,
                ogretim_dili: undefined,
                burs_tipi: "Burs Yok",
                is_yandal: false,
                aciklama:''
            }
        },
        yabanci_dil: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                name: undefined,
                seviye: 1,
                anaDil: false
            }
        },
        seminer_kurs: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                name: null,
                kurum: null,
                baslangicTarihi: null,
                bitisTarihi: null,
                sure: null,
                aciklama: null,
            }
        },
        projeler: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                name: null,
                tarih: null,
                url: null,
                aciklama: null
            }
        },
        sertifikalar: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                name: null,
                alindigi_kurum: null,
                tarih: null,
                aciklama: null
            }
        },
        ek_bilgiler: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                name: null
            }
        },
        referanslar: {
            index: null,
            isShow: false,
            isEdit: false,
            content: {
                type: null,
                language: null,
                name: null,
                surname: null,
                firmaAdi: null,
                position: null,
                email: null,
                phone: null
            }
        }
    }

    constructor(
        library: FaIconLibrary,
        private confirmDialogService: ConfirmDialogService
    ) {
        library.addIconPacks(fas);
    }

    ngOnInit() {
        this.countryList = countries.Countries;
        this.universityList = university;
        this.faculties = faculty;
        this.departments = departments;
    }

    public scrollToView(element: string) {
        let elem = document.querySelector(element) as HTMLElement | null;

        if (elem != null)
            window.scrollTo(0, elem.offsetTop - 20)
    }

    deleteImage() { }

    getOperationTime(baslangic:string,bitis:string): string{
        let milisecondBetween:number = +new Date(bitis) - +new Date(baslangic);
        let year = Math.floor(milisecondBetween/(1000*60*60*60*12*12));
        let month = Math.floor((milisecondBetween/(1000*60*60*60*12*12) - Math.floor(milisecondBetween/(1000*60*60*60*12*12)))*12);
        return `<div class="row">
            <div class="col-12">
                <h3 class="text-center">
                    ` + year + ` Yıl
                </h3>
            </div>
            <div class="col-12 text-center mt-2">
                <span>
                    ` + month + ` Ay
                </span>
            </div>
        </div>`
    }

    clickImageInput() {
        let elem = document.getElementById('profileImage') as HTMLElement | null;

        if (elem != null)
            elem.click();
    }

    newWorkExperience() {
        this.isAddEditCv.is_deneyimi.isShow = true;
    }

    editWorkExperience(D: any, index: any) {
        this.isAddEditCv.is_deneyimi.isShow = true;
        this.isAddEditCv.is_deneyimi.isEdit = true;
        this.isAddEditCv.is_deneyimi.index = index;
        this.isAddEditCv.is_deneyimi.content = D;
    }

    deleteWorkExperience() {
        const _this = this;
        _this.confirmDialogService.confirmThis('İş deneyimini silmek istediğinize emin misiniz?', () => {
            if(_this.isAddEditCv.is_deneyimi.index)
                _this.is_deneyimi.splice(_this.isAddEditCv.is_deneyimi.index, 1);
            _this.resetWorkExperience();
            _this.isAddEditCv.is_deneyimi.index = null;
            _this.isAddEditCv.is_deneyimi.isShow = false;
            _this.isAddEditCv.is_deneyimi.isEdit = false;
        }, () => {
        });

        
    }

    saveWorkExperience(){
        const _this = this;
        if(!_this.is_deneyimi)
            _this.is_deneyimi = [];
        if(_this.isAddEditCv.is_deneyimi.isEdit == false)
            _this.is_deneyimi.push(_this.isAddEditCv.is_deneyimi.content);
        
        _this.resetWorkExperience();
        _this.isAddEditCv.is_deneyimi.index = null;
        _this.isAddEditCv.is_deneyimi.isShow = false;
        _this.isAddEditCv.is_deneyimi.isEdit = false;
    }

    resetWorkExperience() {
        this.isAddEditCv.is_deneyimi.content = {
            firmaAdi:'',
            pozisyon:undefined,
            baslangicTarihi:'',
            bitisTarihi:'',
            halaCalisiyorum:false,
            firmaSektoru:undefined,
            isAlani:undefined,
            calismaSekli:undefined,
            ulke:undefined,
            il:undefined,
            isTanimi:''
        }
    }

    changeCountry() {
        this.provinceList = this.countryList.filter((x:any) => x.CountryName == this.isAddEditCv.is_deneyimi.content.ulke)[0].States;
    }

    newEducationInfo() {
        this.isAddEditCv.egitim_bilgileri.isShow = true;
    }

    editEducationInfo(E: any, index: any) {
        this.isAddEditCv.egitim_bilgileri.isShow = true;
        this.isAddEditCv.egitim_bilgileri.isEdit = true;
        this.isAddEditCv.egitim_bilgileri.index = index;
        this.isAddEditCv.egitim_bilgileri.content = E;
    }

    deleteEducationInfo() {
        const _this = this;
        _this.confirmDialogService.confirmThis('Eğitim bilgisini silmek istediğinize emin misiniz?', () => {

            if(_this.isAddEditCv.egitim_bilgileri.index)
                _this.egitim_bilgileri.splice(_this.isAddEditCv.egitim_bilgileri.index, 1);
            _this.resetEducationInfo();
            _this.isAddEditCv.egitim_bilgileri.index = null;
            _this.isAddEditCv.egitim_bilgileri.isShow = false;
            _this.isAddEditCv.egitim_bilgileri.isEdit = false;
        }, () => {
        });

        
    }

    saveEducationInfo(){
        const _this = this;
        if(!_this.egitim_bilgileri)
            _this.egitim_bilgileri = [];
        if(_this.isAddEditCv.egitim_bilgileri.isEdit == false)
            _this.egitim_bilgileri.push(_this.isAddEditCv.egitim_bilgileri.content);
        
        _this.resetWorkExperience();
        _this.isAddEditCv.egitim_bilgileri.index = null;
        _this.isAddEditCv.egitim_bilgileri.isShow = false;
        _this.isAddEditCv.egitim_bilgileri.isEdit = false;
    }

    resetEducationInfo() {
        this.isAddEditCv.egitim_bilgileri.content = {
            egitim_durumu: undefined,
            baslangicTarihi: '',
            bitisTarihi: '',
            devamEdiyorum: false,
            terk: false,
            diploma_not_sistemi: undefined,
            diploma_notu: undefined,
            lise: undefined,
            lise_tipi: undefined,
            lise_bolum: undefined,
            universite: undefined,
            fakulte: undefined,
            bolum: undefined,
            ogretim_tipi: undefined,
            ogretim_dili: undefined,
            burs_tipi: "Burs Yok",
            is_yandal: false,
            aciklama:''
        }
    }

    newForeignLanguage() {
        this.isAddEditCv.yabanci_dil.isShow = true;
    }

    editForeignLanguage(L: any, index: any) {
        this.facultyList = this.faculties.filter((x:any) => x.university == L.universite);
        this.departmentList = this.departments.filter((x:any) => x.university == L.universite && x.faculty == L.fakulte);

        this.isAddEditCv.yabanci_dil.isShow = true;
        this.isAddEditCv.yabanci_dil.isEdit = true;
        this.isAddEditCv.yabanci_dil.index = index;
        this.isAddEditCv.yabanci_dil.content = L;
    }

    deleteForeignLanguage() {
        const _this = this;
        _this.confirmDialogService.confirmThis('Dili silmek istediğinize emin misiniz?', () => {
            if(_this.isAddEditCv.yabanci_dil.index)
                _this.yabanci_dil.splice(_this.isAddEditCv.yabanci_dil.index, 1);
            _this.resetForeignLanguage();
            _this.isAddEditCv.yabanci_dil.index = null;
            _this.isAddEditCv.yabanci_dil.isShow = false;
            _this.isAddEditCv.yabanci_dil.isEdit = false;
        }, () => {
        });

        
    }

    saveForeignLanguage(){
        const _this = this;
        if(!_this.yabanci_dil)
            _this.yabanci_dil = [];
        if(_this.isAddEditCv.yabanci_dil.isEdit == false)
            _this.yabanci_dil.push(_this.isAddEditCv.yabanci_dil.content);
        
        _this.resetForeignLanguage();
        _this.isAddEditCv.yabanci_dil.index = null;
        _this.isAddEditCv.yabanci_dil.isShow = false;
        _this.isAddEditCv.yabanci_dil.isEdit = false;
    }

    resetForeignLanguage() {
        this.isAddEditCv.yabanci_dil.content = {
            name: undefined,
            seviye: 1,
            anaDil: false
        }
    }

    changeMotherTongue(){
        if(this.isAddEditCv.yabanci_dil.content.anaDil)
            this.isAddEditCv.yabanci_dil.content.seviye = 5;
    }

    changeUniversity() {
        this.facultyList = [];
        this.departmentList = [];
        this.facultyList = faculty.filter((x:any) => x.university == this.isAddEditCv.egitim_bilgileri.content.universite);
    }

    changeFaculty() {
        this.departmentList = [];
        if(this.departments && this.departments.length > 0)
            this.departmentList = this.departments.filter((x:any) => x.university == this.isAddEditCv.egitim_bilgileri.content.universite && x.faculty == this.isAddEditCv.egitim_bilgileri.content.fakulte);
    }
}
