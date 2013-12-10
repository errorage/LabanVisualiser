var lgetout = function ( allok ) {
/*
    close files and wait

	called by  linter, lcopyfigs, lcopysubs, ldopivot, lchange,
	           lfindstaff, lfindystart, lleggesture, lselectfig,
	           loverlap,
*/
	if ( allok == 0 ) {
		console.log(nudesname + " created OK.");
		if (infile) console.log("Close infile.");
		if (nudesfile) console.log("Close nudesfile.");
		if (figsfile) console.log("Close figsfile.");
	} else {
		console.log("lintel snag, line " + j);
		console.log(lbnline[j]);
	}
};/* lgetout */
/***********************************************************/

var initialise = function () { 
/*
   set up constants to default values

   called by main,
*/
	var a,b;
	var k,m,n;
	
	prdone = FALSE;
	nbar = -1;
	rise = 1;
	prevc = 0;
	previ = 11;
	track = TRUE;
	mspace = false;
	wspace = FALSE;
	
	doub0 = 0;
	doub1 = 1;
	doub2 = 2;
	doub3 = 3;
	doub4 = 4;
	doub10 = 10;
	doub60 = 60;
	doub90 = 90;
	doub150 = 150;
	doub179 = 179;
	doub180 = 180;
	doub181 = 181;
	doub255 = 255;
	doub360 = 360;
	doub500 = 500;
	inv2 = doub1/doub2;
	inv3 = doub1/doub3;
	inv4 = doub1/doub4;
	inv5 = doub1/5.0;
	inv6 = doub1/6.0;
	inv10 = doub1/doub10;
	inv256 = doub1/256.0;
	inv1000 = doub1/1000.0;
	rt3 = Math.sqrt(doub3);
	piby2 = doub2*Math.atan(doub1);
	pi = piby2+piby2 ;
	twopi = pi+pi;
	radten = twopi/3600.0;
	radian = twopi/doub360;
	degree = doub1/radian;
	lg2 = Math.log(doub2);
	freeze = FALSE;
	forward = TRUE;
	single = DONE;
	pause = FALSE;
	shadow = TRUE;
	fnums = TRUE;
	bnums = TRUE;
	hold = NO;
	prevhold = -99;
	prev_time = -1;
	fstart = 0;
	fstop = 0;
	pstart = 0;
	pend = 0;
	fmax = 0;
	vstart = 0;
	vstop = FMAX;
	inmain = TRUE;
	start = -1;
	lline = 0;
	fast = 1;
	slow = 1;
	fslow = 1;
	njts = 0;
	nvars = 0;
	nfiles = 0;
	nvals = 0;
	axlen[0] = 1; axlen[1] = 1; axlen[2] = 1;
	
	for (  j = 0 ; j < EMAX ; ++ j ) {
		if ( j > 2) axlen[j] = -1;
		keylen[j] = 0;
		ellen[j] = -1;
		jntlen[j] = -1;
		fillen[j] = -1;
		figlen[j] = -1;
		sublen[j] = -1;
		varlen[j] = -1;
		knee[j] = 0 ;
		figell[j] = 0;
		ellfig[j] = 0;
		usevar[j] = 0;
		coel[j][0] = -1;
		coel[j][1] = -1;
		subact[j][0] = 0;
		subact[j][1] = 0;
		called[j] = FALSE;
		defined[j] = FALSE;
		val[j] = doub0 ;

		for (  k = 0 ; k < 3 ; ++ k ) {
			cen[j][k] = doub3;
			ax[j][k] = doub2;
			lim[j][k][0] = -doub360;
			lim[j][k][1] =  doub360;
			obs[k][0] = doub0;
			obs[k][1] = doub0;
			obs[k][2] = doub0;
			obs[k][k] = doub1;
		}
		
		col[j][0] = doub255;
		col[j][1] = doub150;
		col[j][2] = doub90;
		quat[j][0] = doub1;
		quat[j][1] = doub0;
		quat[j][2] = doub0;
		quat[j][3] = doub0;
		quat[j][4] = doub1;
		
		axnam[j] = "";
		tname[j] = "";
		fname[j] = "";
		ename[j] = "";
		jname[j] = "";
		vname[j] = "";
		sname[j] = "";
	}
	axnam[0][0] = 'x';
	axnam[1][0] = 'y';
	axnam[2][0] = 'z';
/*
     set all actions by default to stop
*/
	for (  j = 0 ; j < PMAX ; ++ j ) {
		type[j] = stop_keyword_code;
		frstart[j] = 0;
		frstop[j] = 0;
		distrn[j] = 0;
		cline[j] = 0;

		for (  k = 0 ; k < 6 ; ++ k )
			pf[j][k] = 0;
	}
/*
     artificially set up subroutine "nudes",
     file "dummy", figures "every" and "world",
     variable "variable", and ellipsoid "world"-
*/
	nsubs = 1;
	nfigs = 2;
	ne = 1;
	figell[0] = 0;
	figell[1] = 1;
	
	tname[0] = dummy;
	sname[0] = nudes;
	fname[0] = every;
	fname[1] = world;
	ename[0] = world;
	vname[0] = variab;
	
	fillen[0] = 5;
	sublen[0] = 5;
	figlen[0] = 5;
	figlen[1] = 5;
	ellen[0] = 5;
	varlen[0] = 6;
	ax[0][0] = doub1;
	ax[0][1] = doub1;
	ax[0][2] = doub1;
	df = 1;
	f = 0;
	nsph = SSTART;
	anglex = doub0; angley = doub0; anglez = doub0;
	tx = doub0; ty = doub0; tz = doub0;
	scale = doub1;
	alpha = doub3;
	t = 0;
	more = 1;
	ok = 0;

// find bits in double mantissa -	
	b = doub1;
	m = 0;
	for (a = inv2; doub1 + b > doub1 + a; a *= inv2) {
		b = a;
		++ m;
	}
	tolr = b+b;
	j = 2;
	n = 0;

// find bits in integer -
	for (k = 1; k < j; j += j)
	{
		k += k;
		++ n;
	}
	maxint = k;
	console.log("\n tolr " + tolr + " (" + m + " bits), maxint " + maxint + " (" + n + " bits)\n");
}; /* initialise */
/***************************************/

var bell = function ( number, delay) {
	var i, j;
	for ( i = 0; i < number; i++ ) {
		console.log( "\a" );
		for ( j = 0; j < delay; j++ );
	}
}; /* bell */
/***************************************/

var lfindnext = function( c, y1, y2) {
/*
   find next symbol in column 'c' in range 'y1' to 'y2'.

   called by ldostep,
*/
	var k;
	var q;
	var yy;
	
	q = -1;
	yy = y2;
	for (k = sstart; k < ssend; ++k) {
		if ((lbn[k].c == jc) && (lbn[k].y >= y1) && (lbn[k].y <= y2))	{
			if (lbn[k].y < yy)	{
				q = k;
				yy = lbn[k].y;
			}
		}
	}
	return q;
};   /* lfindnext */
/****************************************************/

var lsetframes = function () {
/*
    set the frames over which an action occurs :-
    fstart, fhalf, frange, fend.

    called by laction,
*/
	if (nbar < 1) {
		fstart = 0;
		frange = 1;
		fend = 1;
	} else {
		fstart = Math.floor(inv2 + lbn_fpp * jy-ystart);
		if (fstart < 1) fstart = 1;
		frange = Math.floor(inv2 + lbn_fpp * jh);
		if (frange < 1) frange = 1;
		fend = fstart + frange;
	}
	fhalf = fstart + frange/2;
	if (fend <= fstart) fend = fhalf+1;
	if (fhalf > fend) fend = fhalf+1;
	if (fend > fmax) fmax = fend;
}; /* lsetframes */
/************************************************/

var lcolx = function ( lcentre ) {
/*
    find column number of each symbol
	-5 = L arm
	-3 = L gesture
    -1 = L support
	 1 = R support
	 3 = R gesture
	 5 = R arm
	
    called by linter,
*/
	var k;
	var kc;
	var kwx;
	
	for (k = 0; k < nlabs; ++k) {
	kwx = lbn[k].x + (lbn[k].w/2);
	kc = (kwx - lcentre)/STEP;
	if (kwx < lcentre)
		--kc;
	else
		++kc;
	lbn[k].c = kc;
	}
}; /* lcolx */
/************************************************/


var lbnread = function () {
/*
   read .lbn laban score file

   called by linter,
*/
	var j;
	var i,x,y,s,w,h;
	var d;
	var m0,m1,m2,m3;
	
	j = 0;
	xmax = 0;
	xmin = 10000;
	var done = false;
	getFileFromServer(infile, function(text) {
		if (text === null) {
			console.log("lbnread oops\n");
		} else {
			lbnline = text.split("\n");
			while ( j < LMAX ) {
				buf = lbnline[j];
				sscanf(buf,"%c%c%c%c %d %d %d %d %d %d %c",
					m0,m1,m2,m3,i,x,y,s,w,h,d);
				if (m0 != '#') {
					lbn[j].m = m0;
					if ((m0 == 'P')&&(m1 == 'a'))
						lbn[j].m = Path;
					lbn[j].i = i;
					lbn[j].x = x;
					lbn[j].y = y;
					lbn[j].w = w;
					lbn[j].h = h;
					lbn[j].s = s;
					lbn[j].b = -1;
					lbn[j].l = j;
					lbn[j].a = TODO;
					lbn[j].x2 = x+w;
					lbn[j].y2 = y+h;
					lbn[j].d = BLANK;
					if (d =='M') lbn[j].d = MED;
					if (d =='L') lbn[j].d = LOW;
					if (d =='H') lbn[j].d = HIGH;
					if (x < xmin) xmin = x;
					if (x+w > xmax) xmax = x+w;
					if (j >= LMAX) {
					  console.log("\nBEWARE: score truncated at line "+ j +"\n");
					  console.log("more than "+ LMAX +" laban score items\n");
					}
					++j;
				}
			} /* while reading next line */
			done = true;
		}
	});
	while (done == false) {}
	nlabs = j;
	console.log("\n   lbnread: "+ nlabs +" lbn symbols\n");
};  /* lbnread */
/************************************************/

var lassign = function() {
/*
   assign global variables

   called by laction, lsorty, lbent,
*/
	ja = lbn[j].a;
	jb = lbn[j].b;
	jc = lbn[j].c;
	jd = lbn[j].d;
	jh = lbn[j].h;
	ji = lbn[j].i;
	jl = lbn[j].l;
	jm = lbn[j].m;
	js = lbn[j].s;
	jw = lbn[j].w;
	jx = lbn[j].x;
	jy = lbn[j].y;
	jx2 = lbn[j].x2;
	jy2 = lbn[j].y2;
}; /* lassign */
/**********************************************/

var lsorty = function () {
/*
   sort score symbols into ascending order of 'y'
   (bubble sort)
   find maxy, and fill yj table

   called by linter,
   calls     lassign,
*/
	var k;
	var last;
	var y;
	
	for (j = 0; j < (nlabs-1); ++j)
	{
	  for (k = j; k < nlabs; ++k)
	  {
		 if (lbn[k].y < lbn[j].y)
		 {
			lassign();
			lbn[j].a = lbn[k].a;
			lbn[j].b = lbn[k].b;
			lbn[j].c = lbn[k].c;
			lbn[j].d = lbn[k].d;
			lbn[j].h = lbn[k].h;
			lbn[j].i = lbn[k].i;
			lbn[j].l = lbn[k].l;
			lbn[j].m = lbn[k].m;
			lbn[j].s = lbn[k].s;
			lbn[j].w = lbn[k].w;
			lbn[j].x = lbn[k].x;
			lbn[j].y = lbn[k].y;
			lbn[j].x2 = lbn[k].x2;
			lbn[j].y2 = lbn[k].y2;
			lbn[k].a = ja;
			lbn[k].b = jb;
			lbn[k].c = jc;
			lbn[k].d = jd;
			lbn[k].h = jh;
			lbn[k].i = ji;
			lbn[k].l = jl;
			lbn[k].m = jm;
			lbn[k].s = js;
			lbn[k].w = jw;
			lbn[k].x = jx;
			lbn[k].y = jy;
			lbn[k].x2 = jx2;
			lbn[k].y2 = jy2;
			buf = lbnline[j];
			lbnline[j] = lbnline[k];
			lbnline[k] = buf;
		 }
	  }
	}
	ymax = 0;
	for (j = 0; j < nlabs; ++j)
		if (((lbn[j].y2) > ymax)&&(lbn[j].m != Stav))
			ymax = lbn[j].y2+1;
	for (y = 0; y < ymax; ++y)
		yj[y] = -1;
	for (j = 0; j < nlabs; ++j) {
		y = lbn[j].y;
		if (y < 0) y = 0;
		if (yj[y] < 0) yj[y] = j;
	}
	last = 0;
	for (y = 0; y < ymax; ++y) {
	   if (yj[y] < 0)
			yj[y] = last;
	   else
			last = yj[y];
	}
};   /* lsorty */
/************************************************/

var lsortx = function (stff, nstff) { //TODO !!! ASK about parameters
/*
   sort staff symbols into ascending order of 'x'
   (bubble sort)

   called by lfindstaff,
*/
   var j;
   var k;
   var s0,s1;

   for (j = 0; j < (nstff-1); ++j) {
      for (k = j; k < nstff; ++k) {
         if (stff[k][1] < stff[j][1]) {
            s0 = stff[j][0];
            s1 = stff[j][1];
            stff[j][0] = stff[k][0];
            stff[j][1] = stff[k][1];
            stff[k][0] = s0;
            stff[k][1] = s1;
         }
      }
   }
   return stff;
};   /* lsortx */
/************************************************/

var loverlap = function( p1j, p2j, p1k, p2k) {
/*
   check how much symbols j and k overlap in dimension p

   called by lbent, lleggesture, lhastap, lhasgesture,
             lseeksym, ldopivot,
			 
   calls lgetout,
*/
   var p1max,p2min;
   var lap;

   if ((p1j > p2j)||(p1k > p2k)) {
	   console.log("OOPS: loverlap "+p1j+" "+p2j+" "+p1k+" "+p2k+"\n");
	   lgetout(j);
   }
   lap = FALSE;
   if (p1k < p1j)
      p1max = p1j;
         else
            p1max = p1k; 
   if (p2k < p2j)
      p2min = p2k;
         else
            p2min = p2j;
   lap = p2min - p1max;
   return lap;
} /* loverlap */
/********************************************/

var lfindstaff = function() {
/*
    find the centres of the staves

    called by linter,
	calls     lsortx, lgetout,
*/
	var j,jp,jq;
	var k,kp,kq;
	var staffstart;
	var nstaffstart;
	var nstff;
	var stff = get2DArray(TMAX);  // [TMAX][2];
	
	k = 0;
	staffstart = 0;
	for (j = 0; j < nlabs; ++j) {
		if (lbn[j].m == Stav) {
			stff[k][0] = j;
			stff[k][1] = lbn[j].x;
			if (lbn[j].y > staffstart)
				staffstart = lbn[j].y;
			nstaffstart = j;
			++k;
			lbn[j].a = DONE;
		}
	}
	if (k < 3) {
	  console.log("lfindstaff: only "+k+" staff lines\n");
	  lgetout(1);
	  if (ok == 1)
	  return;
	}
	if (k > TMAX) {
	  console.log("lfindstaff: "+k+" staff lines, max "+TMAX+"\n");
	  lgetout(1);
	  if (ok == 1)
	  return;
	} 
	nstff = k;
	lsortx(stff,nstff);
	k = 0;
	for (j = 1; j < nstff; j += 3)
	{
	  staff[k][0] = stff[j][0];
	  staff[k][1] = stff[j-1][1];
	  staff[k][2] = stff[j][1];
	  staff[k][3] = stff[j+1][1];
	  staff[k][4] = -1;
	  staff[k][5] = TODO;
	  ++k;
	}
	nstaff = k;
	stmiddle = (staff[0][2] + staff[nstaff-1][2])/2;
	npins = 0;
	// seek pins under center stafflines
	for (j = 0; j < nstaffstart; ++j)
	{
	  if (lbn[j].m == Pins)
	  {
		 jp = lbn[j].x;
		 jq = lbn[j].x2;
		 pins[npins][0] = j;
		 pins[npins][1] = -1;
		 for (k = 0; k < nstaff; ++k)
		 {
			kp = staff[k][2] - 1;
			kq = kp+2;
			if (loverlap(jp,jq,kp,kq) > 0)
			{
			   if (lbn[j].d == 0)
			   {
				  staff[k][4] = MAN;
				  pins[npins][1] = k;
				  lbn[j].a = DONE;
			   }
			   else
			   {
				  staff[k][4] = WOMAN;
				  pins[npins][1] = k;
				  lbn[j].a = DONE;
			   } /* empty pin */
			} /* pin under central staff */
		 } /* k : staff lines */
		 ++npins;
	  } /* a pin found */
	} /* j */
	if (nstaff < 1)
	   printf("No staves found\n");
	else
	for (j = 0; j < nstaff; ++j)
	{
		if (j == 0)
			printf("\n");
	  printf("staff %d: ",j+1);
	  if (staff[j][4] == MAN)
		 printf(" man\n");
	  else
	  if (staff[j][4] == WOMAN)
		 printf(" woman\n");
	  else
		 printf(" no gender\n");
	}
	rtrn: ;
}   /* lfindstaff */
/***************************************************/

var lfindystart = function() {
/*
   find y position of first double bar line

   called by linter,
*/
	var j;
	
	ystart = -1;
/*
   seek initial double bar line -
*/
	for (j = 0; ((j < nlabs)&&(ystart < 0)); ++j) {
		if ((lbn[j].m == Bars) && (lbn[j].d == LOW))
			ystart = lbn[j].y + 1;
	}
/*
   if none, seek any bar line -
*/
	if (ystart < 0) {
		for (j = 0; ((j < nlabs)&&(ystart < 0)); ++j)
			if (lbn[j].m == Bars) ystart = lbn[j].y + 1;
	}
/*
   if none, seek any supporting direction symbol -
*/
	if (ystart < 0) {
		for (j = 0; ((j < nlabs)&&(ystart < 0)); ++j)
			if ((lbn[j].m == Dirn) && ((lbn[j].c == 1) || (lbn[j].c == -1)) )
				ystart = lbn[j].y;
		}
		ystart -= 3;
		if (ystart < 0) {
		console.log("linter : findystart finds no direction support symbols\n");
		lgetout(1);
		ystart = 0;
	}
}; /* lfindystart */
/**************************************************/

var output = "";
var lchange = function(d) {
/*
    change bend in ankles,legs, and hips while stepping

    called by ldostep,
*/
   if (d == 'L') {
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls1 tlow1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls2 tlow2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls3 tlow3\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls1 llow1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls2 llow2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls3 llow3\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls1 flow1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls2 flow2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls3 flow3\n";
   } else if (d == 'M') {
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls1 trlx1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls2 trlx2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls3 trlx3\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls1 lrlx1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls2 lrlx2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls3 lrlx3\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls1 frlx1\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls2 frlx2\n";
      output += 
         "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls3 frlx3\n";
   } else if (d == 'H') {
      if ((ji != 1)&&(ji != 10)) {
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls1 thig1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls2 thig2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls3 thig3\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls1 lhig1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls2 lhig2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls3 lhig3\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls1 fmed1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls2 fmed2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls3 fmed3\n";
      } else if ((ji != 5)&&(ji != 6)) {
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls1 trlx1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls2 trlx2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set tcls3 trlx3\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls1 lrlx1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls2 lrlx2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set lcls3 lrlx3\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls1 fhig1\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls2 fhig2\n";
         output += 
            "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set fcls3 fhig3\n";
      }
   } else {
      console.log("linter: funny depth parameter, frame "+fstart+"\n");
      lgetout(1);
   }
}; /* lchange */
/*********************************************/

var lsetcoords = function() {
/*
   set the coordinate system for a step
	
	called by ldostep, lleggesture
	*/
	if ( dofig == MAN ) {
		if (mspace == false)
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    coords mpelvis\n";
		else
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    coords mspace\n";
	} else {
		if (wspace == FALSE)
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    coords wpelvis\n";
		else
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    coords wspace\n";
	}	/* dofig == WOMAN */
}; /* lsetcoords */
/************************************************/

var ldostep = function() {
/*
   create NUDES calls for steps on score

   called by laction,
   calls     lsetframes, lfindnext, lsetcoords
*/
	var b;
	var havestep;
	var k;
	var n;

	b = 0;
	if ( ( jm == Dirn ) && ( ( jc == -1 ) || ( jc == 1 ) ) ) {
		havestep = TRUE;
		k = lfindnext ( jc, jy + jh, jy + 2 * jh );
		if ( ji > 5 )
			n = ji - 5;
		else
			n = ji + 5;
		output += "*\n";
		if ( ( jc == -1 ) && ( ( ji == 1 ) || ( ji == 5 ) || ( ji == 3 ) ) ) {
			console.log("dostep: funny symbol in left support column, line "+j+", bar "+nbar+"\n");
			console.log(leadingZeros(jm, 3)+" "+leadingZeros(ji, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
		} else if ( ( jc == 1 ) && ( ( ji == 10 ) || ( ji == 6 ) || ( ji == 8 ) ) ) {
			console.log("dostep: funny  symbol in right support column, line "+j+", bar "+nbar+"\n");
			console.log(leadingZeros(jm, 3)+" "+leadingZeros(ji, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
		} else {
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    fend  "+frange+"\n";
			output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   "+risesub[jd]+"\n";
			lsetcoords();
			if ( jc > 0 )
				output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   forright\n";
			else
				output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   forleft\n";
			if ( ( ji == 1 ) || ( ji == 10 ) )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" forward\n";
			if ( ji == 3 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" rside\n";
			if ( ji == 8 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" lside\n";
			if ( ( ji == 5 ) || ( ji == 6 ) )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" back\n";
			if ( ji == 2 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" rfordiag\n";
			if ( ji == 9 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" lfordiag\n";
			if ( ji == 4 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" rbacdiag\n";
			if ( ji == 7 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" lbacdiag\n";
			if ( ji == 11 )
				output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" close\n";
			lbn[j].a = DONE;
			pstart = fstart;
			pend = fend;
		}
		rise = jd;
		prevc = jc;
		previ = ji;
	} /* column OK */
}     /* ldostep */
/****************************************************/

var lhastap = function(j) {
/*
   check if symbol j has overlapping ground contact
   
   called by ldopivot,
*/
   var t;
   var yk;
   var k;
   var kc,ki,ky,ky2;
   var km;

   t = -1;
   yk = jy - jh;
   if (yk < 1) yk = 1;
   for (k = yj[yk]; ((t < 0)&&(k < nlabs)&&(lbn[k].y < jy2)); ++k) {
      km = lbn[k].m;
      if (km == Misc) {
         ki = lbn[k].i;
         if ((ki >= 4) && (ki <= 9)) {
            kc = lbn[k].c;
            if ((kc == -3)||(kc == -2)||(kc == 2)||(kc == 3)) {
               ky = lbn[k].y;
               ky2 = ky + lbn[k].h;
               if (loverlap(jy,jy2,ky,ky2) > 0) {
                  t = k;
               } /* overlap = TRUE*/
            } /* in leg gesture column */
         } /* tap symbol */
      } /* tap menu */
   } /* k */
   return(t);
}; /* lhastap */
/*******************************************************/

var lhasgesture = function(j) {
/*
   check if symbol j has overlapping gesture
   
   called by ldopivot,
   calls     loverlap,
*/
   var kc,ky,ky2;
   var k;
   var g;
   var km;

   g = -1;
   for (k = 0; ((g < 0)&&(k < nlabs)); ++k) {
      km = lbn[k].m;
      if (km == Dirn) {
         kc = lbn[k].c;
         if ((kc == -3)||(kc == 3)) {
            ky = lbn[k].y;
            ky2 = lbn[k].y2;
            if (loverlap(jy,jy2,ky,ky2) > 0)
               g = k;
         }
      }
   }
   return(g);
}; /* lhasgesture */
/*******************************************************/

var lleggesture = function() {
/*
   do gestures of the legs

   called by laction,
   calls     lsetframes, lgetout, lsetcoords,

   Volm   1  RELAX
   Volm   3  BENT
   Volm   2  STRAIGHT
   Volm   4  STRETCH
   Volm   7  hold
*/
   if ((jc == -3)||(jc == 3)) {
         if ((jd < 0) || (jd > 2)) {
            console.log("OOPS: dogesture height problem line "+j+"\n");
            console.log(leadingZeros(jm, 3)+" "+leadingZeros(ji, 3)+" "+leadingZeros(jx, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
            lgetout(j);
            if (ok == 1) return;
         } /* level funny */
         output += "*\n";
         if  (ji==11)
            output += "* close without weight";
         else
         if ((ji==1)||(ji==10))
            output += "* forward gesture";
         else
         if ((ji==2)||(ji==9))
            output += "* forward diagonal gesture";
         else
         if ((ji==3)||(ji==8))
            output += "* sideways gesture";
         else
         if ((ji==4)||(ji==7))
            output += "* back diagonal gesture";
         else
         if ((ji==5)||(ji==6))
            output += "* backward gesture";
//
         if (jd == LOW)
            output += " low\n";
         if (jd == MED)
            output += " middle\n";
         if (jd == HIGH)
            output += " high\n";
//
         if (jc < 0) {
            if ((ji <= 1)||(ji == 3)||(ji == 5)||(ji > 11)) {
               console.log("OOPS: dogesture direction problem line "+j+"\n");
               console.log(leadingZeros(jm, 3)+" "+leadingZeros(ji, 3)+" "+leadingZeros(jx, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
               lgetout(1);
               if (ok == 1) return;
            } /* i wrong */
            output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   forleft * left = b\n";
         } /* left side */
         else if (jc > 0) {
            if ((ji < 1)||(ji == 6)||(j == 8)||(ji == 10)||(ji > 11)) {
               console.log("OOPS: dogesture direction problem line "+j+"\n");
               console.log(leadingZeros(jm, 3)+" "+leadingZeros(ji, 3)+" "+leadingZeros(jx, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
               lgetout(1);
               if (ok == 1) return;
            } /* i wrong */
            output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   forright * right = b\n";
         } /* right side */
//
         output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" centre afoot  "+xyz[dofig]+"\n";
//
         if (ji == 11) {
            output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call   "+risesub[rise]+"\n";
            output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" set    fend  "+frange+"\n",
				lsetcoords();
            output += "call      "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" close\n";
         } /* close without weight */
         else {
            output += "quadratic "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" bendto bthigh bhip   pelvis "+stt[jd][ji][0]+" "+stt[jd][ji][1]+" "+stt[jd][ji][2]+"\n";
            if ((jd == LOW)&&((ji == 1)||(ji == 3)||(ji == 8)||(ji == 10))||(jb == 2)||(jb == 4))
               output += "linear    "+leadingZeros(fhalf, 3)+" "+leadingZeros(fend, 3)+" bendto bleg   bknee  bthigh lhig1 lhig2 lhig3\n";
            else
               output += "linear    "+leadingZeros(fhalf, 3)+" "+leadingZeros(fend, 3)+" bendto bleg   bknee  bthigh lrlx1 lrlx2 lrlx3\n";
            output += "linear    "+leadingZeros(fhalf, 3)+" "+leadingZeros(fend, 3)+" bendto bfoot  bankle bleg   fhig1 fhig2 fhig3\n";
         } /* doing a leg gesture */
         if ((ji != 11)&&(hold == NO)||(st < 1))
            output += "repeat    "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" moveto fig    afoot  "+xyz[dofig]+"\n";
         lbn[j].a = DONE;
      } /* no tap and pivot */ /* c OK */
} /* lleggesture */
/***************************************************/

//PORT ON 2013-12-09 (Errorage)
var ldoarms = function() {
/*
   do movements of the arms

   called by ldolimb,
   calls     lsetframes,
*/
	var absjc;
	
	if (jc < 0) absjc = -jc; else absjc = jc;
	if ((absjc > 3)&&(absjc < 7))
	{
		if (jm == Dirn)
		{
			output += "*\n* arms\n";
			if ((jd < 0) || (jd > 2))
			{
				console.log("ldoarms problem line "+j+" bar "+nbar+"\n");
				console.log(""+ jm+" "+leadingZeros(ji, 3)+" "+leadingZeros(jx, 3)+" "+leadingZeros(jy, 3)+" "+leadingZeros(js, 3)+" "+leadingZeros(jw, 3)+" "+leadingZeros(jh, 3)+" "+jd+"\n");
				lgetout(1);
				if (ok == 1) return;
			}
			if (jc < 0) // left arm
			{
				if (jb == RELAX)
				{
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto luarm lshldr shldrs "+leadingZeros(arlx[jd][ji][0], 3)+" "+leadingZeros(arlx[jd][ji][1], 3)+" "+leadingZeros(arlx[jd][ji][2], 3)+"\n";
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto llarm lelbow luarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(45, 3)+"\n";
					if (dofig == MAN)
					{  
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto lhand lwrist llarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+"\n";
					} /* man */
					else
					{
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto lhand lwrist llarm "+leadingZeros(270, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(150, 3)+"\n";
					} /* woman */
				}
				else
				if (jb == BENT)
				{
					if (ji == 11)
					{
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto luarm lshldr shldrs "+leadingZeros(abnt[jd][0][0], 3)+" "+leadingZeros(abnt[jd][0][1], 3)+" "+leadingZeros(abnt[jd][0][2], 3)+"\n";
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto llarm lelbow luarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(70, 3)+"\n";
					}
					else
					{
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto luarm lshldr shldrs "+leadingZeros(abnt[jd][ji][0], 3)+" "+leadingZeros(abnt[jd][ji][1], 3)+" "+leadingZeros(abnt[jd][ji][2], 3)+"\n";
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto llarm lelbow luarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(90, 3)+"\n";
					} /* ji != 11 */
				}
				else
				{
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto llarm lelbow luarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+"\n";
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto luarm lshldr shldrs "+leadingZeros(stt[jd][ji][0], 3)+" "+leadingZeros(stt[jd][ji][1], 3)+" "+leadingZeros(stt[jd][ji][2], 3)+"\n";
				}
			}
			else // if (jc > 0) =  right arm
			{
				if (jb == RELAX)
				{
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto ruarm rshldr shldrs "+leadingZeros(arlx[jd][ji][0], 3)+" "+leadingZeros(arlx[jd][ji][1], 3)+" "+leadingZeros(arlx[jd][ji][2], 3)+"\n";
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rlarm relbow ruarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(45, 3)+"\n";
					if (dofig == MAN)
					{  
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rhand rwrist rlarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+"\n";
					} /* man */	//TODO
					else
					{
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rhand rwrist rlarm "+leadingZeros(270, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(150, 3)+"\n";
					} /* woman */

				} /* relaxed */
				else if (jb == BENT)
				{		   
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto ruarm rshldr shldrs "+leadingZeros(abnt[jd][ji][0], 3)+" "+leadingZeros(abnt[jd][ji][1], 3)+" "+leadingZeros(abnt[jd][ji][2], 3)+"\n";
					if (ji == 11)
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rlarm relbow ruarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(70, 3)+"\n";
					else
						output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rlarm relbow ruarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(90, 3)+"\n";
				} /* bent */
				else
				{
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rlarm relbow ruarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+"\n";
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto ruarm rshldr shldrs "+leadingZeros(stt[jd][ji][0], 3)+" "+leadingZeros(stt[jd][ji][1], 3)+" "+leadingZeros(stt[jd][ji][2], 3)+"\n";
					output += "quadratic "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto rhand rwrist rlarm "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+" "+leadingZeros(0, 3)+"\n";
				} /* not bent or relaxed */
			} /* right arm */
		} /* Dirn symbol */
	} /* in arm column */
	lbn[j].a = DONE;
} /* ldoarms */

var lspotturn = function(j, piv, fstart, fend, g)
/*
  maintain straight non-standing foot with ground 
  contact during turn.

  called by ldopivot,
*/
{
   var gc,gi;

   gi = lbn[g].i;
   gc = lbn[g].c;
   fprintf(nudesfile,"*\n* spot turn-\n");
   if (gc < 0)
      output += "repeat "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call forleft * left = b\n";
   else
      output += "repeat "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call forright * right = b\n";
   output += "repeat "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" centre afoot "+xyz[dofig]+"\n";
   output += "linear "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" spinby fig afoot pelvis "+piv+" y\n";
   output += "linear "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" bendto bthigh bhip pelvis "+stt[0][ji][0]+" "+stt[0][ji][1]+" "+stt[0][ji][2]+"\n";
   output += "repeat "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" ground fig\n";
   if ((hold == NO)||(st < 1))
      output += "repeat "+leadingZeros( fstart, 3)+" "+leadingZeros(fend, 3)+" moveto fig afoot "+xyz[dofig]+"\n";
   output += "linear "+leadingZeros( fstart, 3)+" "+leadingZeros(fhalf, 3)+" bendto bfoot bankle bleg fhig1 fhig2 fhig3\n";
   output += "repeat "+leadingZeros( fhalf, 3)+" "+leadingZeros(fend, 3)+" drag bfoot bfoot bankle bleg x\n";
   lbn[j].a = DONE;
   lbn[t].a = DONE;
} /* lspotturn */
/******************************************************/


var lgetpin = function()
/*
    seek a pin in a rotation sign
	
	called by ldolimb, ldopivot,
	calls     loverlap,
*/
{
    var k;
	var ki;
    var piv;
    var ymost;
    var xlap,ylap;

    ki = -123;
    ymost = -1;
    for (k = yj[jy-jh]; lbn[k].y < jy2; ++k)
    {
         if (lbn[k].m == Pins)
         {
             xlap = loverlap(jx,jx2,lbn[k].x,lbn[k].x2);
             ylap = loverlap(jy,jy2,lbn[k].y,lbn[k].y2);
             if ((xlap > 0) && (ylap > ymost))
             {
                ki = lbn[k].i;
                ymost = ylap;
             } /* pin overlaps more than previous pins */
         } /* got a pin */
    } /* k loop looking for overlapping pin */
	 piv = 0;
    if ((ki > 0)&&(ki <= 9))
    {
       if (ji == 1) piv = -45*(9-ki);
       if (ji == 2) piv = 45*(ki-1);
       if (ki == 1) piv = 360;
    }
    return(piv);
} /* lgetpin */
/***************************************************/

var ldopivo = function()
/*
   do turns in the support columns

   called by laction,
   calls     lsetframes, lspotturn, lhasgesture, 
             lhastap,    lgetpin,
*/
{
   var g;
   var t;
   var piv;

   if ( (jm == Rotn)&&(nbar > 0)&&
	 ((jc == -2)||(jc == -1)||(jc == 1)||(jc == 2)) )
   {
      piv = lgetpin();
      if (fstart < 1) fstart = 1;
      g = lhasgesture(j);
      t = lhastap(j);
      if ((g > 0)&&(t > 0))
      {
         lspotturn(j,piv,fstart,fend,g);
         pstart = fstart;
         pend = fend;
      }
      else
      {
         output += "*\n* pivot\n";
         if (jc < 0)
            output += "repeat "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call forleft * b = left\n";
         else
            output += "repeat "+leadingZeros(fstart, 3)+" "+leadingZeros(fend, 3)+" call forright * b = right\n";
         output += "repeat "+leadingZeros( fstart, 3)+" "+leadingZeros(fstart+1, 3)+" centre bfoot "+xyz[dofig]+"\n";
		 //todo
         fprintf(nudesfile,
            "linear    %3d %3d spinby fig    bfoot  pelvis %d y\n",
               fstart,fend,piv);
         if ((hold == NO)||(st < 1))
			 fprintf(nudesfile,
                "repeat    %3d %3d moveto fig    bfoot  %s\n",
                  fstart,fend,xyz[dofig]);
         if (hold == PR)
             hold = NO;
         pstart = fend;
         pend = fend+1;
      } /* spotturn == false */
   }
} /* ldopivot */
/**************************************************/


var lseeksym = function(m, i, x1, x2, y3, y4)
/*
     seek a symbol of menu m, item i,
	 overlapping box x1,x2,y1,y2.

	 called by lbows, lsethold,
	 call      loverlap,
*/
{
   var lap;
   var kstart;
   var k,kx,kx2,ky,ky2;
   var y1,y2;

   lap = -1;
   if (y3 < 0) y1 = 0; else y1 = y3;
   if (y4 < 0) y2 = 0; else y2 = y4;
   kstart = y1 - 2*STEP;
   if (kstart < 1) kstart = 1;
   for (k = yj[kstart]; ((lap < 0)&&(lbn[k].y < y2)); ++k)
   {
      kx = lbn[k].x;
      kx2 = lbn[k].x2;
      ky = lbn[k].y;
      ky2 = lbn[k].y2;
      if ((lbn[k].m == m )&&(lbn[k].i == i))
      {
         if ((loverlap(x1,x2,kx,kx2) > 0)
            && (loverlap(y1,y2,ky,ky2) > 0))
         {
            lap = k;
         }
      } /* m and i true */
   } /* k loop */
   return(lap);
}  /* lseeksym */
/***************************************************/


var lbows = function()
/*
      detect and flag the various contact bows.

	  called by linter,
	  calls     lseeksym,

Relevant symbols:-
     m     i
    Misc   1  bow
    Limb   4  lhand
    Limb   9  rhand
    Area   1  top/front 
    Area   5  back/bottom
    Volm   1  relax
    Volm   2  bent
    Volm   3  straight
    Volm   4  stretch
    Volm   7  hold
*/
{
   var centre;
   var held,front,back;
   var mlhand,mrhand,wlhand,wrhand;

   centre = (staff[0][2] + staff[1][2])/2;
   for (j = 0; j < nlabs; ++j)
   {
      if ((lbn[j].m == Misc)&&(lbn[j].i == 1))
      {
          lassign();
          held = lseeksym(Volm,1,jx,jx2,jy-STEP,jy2);
	  if (held > 0)
          {
              mlhand = lseeksym(Limb,4,jx-STEP/2,jx+STEP/2,jy,jy2+STEP);
              mrhand = lseeksym(Limb,9,jx-STEP/2,jx+STEP/2,jy,jy2+STEP);
              wlhand = lseeksym(Limb,4,jx2-STEP/2,jx2+STEP/2,jy,jy2+STEP);
              wrhand = lseeksym(Limb,9,jx2-STEP/2,jx2+STEP/2,jy,jy2+STEP);
              front  = lseeksym(Area,1,jx-STEP/2,jx+STEP/2,jy,jy2+STEP);
              if (front < 0)
                 front  = lseeksym(Area,1,jx2-STEP/2,jx2+STEP/2,jy,jy2+STEP);
              if (front < 0)
                 front  = lseeksym(Area,2,jx-STEP/2,jx+STEP/2,jy,jy2+STEP);
              if (front < 0)
                 front  = lseeksym(Area,2,jx2-STEP/2,jx2+STEP/2,jy,jy2+STEP);
              back   = lseeksym(Area,5,jx-STEP/2,jx+STEP/2,jy,jy2+STEP);
              if (back < 0)
                 back  = lseeksym(Area,5,jx2-STEP/2,jx2+STEP/2,jy,jy2+STEP);
              jb = 0;
              if (front > 0)
              {
                 jb = FRONT;
                 lbn[front].a = DONE;
              }
              else 
              if (back > 0)
              {
                 jb = BACK;
                 lbn[back].a = DONE;
              }
              if (mlhand > 0) jb += MLHAND;
              if (mrhand > 0) jb += MRHAND;
              if (wlhand > 0) jb += WLHAND;
              if (wrhand > 0) jb += WRHAND;
              if (jb <= 0)
                 fprintf(nudesfile,"* OOPS: lbows: bow %d with no contacts\n",j);
              else
              {
                 if (mlhand > 0) lbn[mlhand].b = jb;
                 if (mrhand > 0) lbn[mrhand].b = jb;
                 if (wlhand > 0) lbn[wlhand].b = jb;
                 if (wrhand > 0) lbn[wrhand].b = jb;
              }
           } /* held */
           output += "* lbowsb "+ j+1+" "+held+" "+front+" "+back+" "+mlhand+" "+mrhand+" "+wlhand+" "+wrhand+" "+jb+"\n";
      } /* contact bow */
   } /* j */
} /* lbows */
/****************************************/


var lstart = function()
/*
   seek pins denoting starting positions.

   called by linter,
*/
{
   var k;
   var p;
   var dx,dz;
   var mx,my;
   var wx,wy;

   mx = -123;
   my = -123;
   wx = -123;
   wy = -123;
   if (nm > 0)
      output += "\n*\ncall 0 1 doman\n";
   else
      output += "\n*\ncall 0 1 dowoman\n";
   output += "call 0 1 forleft\n";
   for (k = 0; k < npins; ++k)
   {
      if (pins[k][1] < 0)
      {
         p = pins[k][0];
         ji = lbn[p].i;
         if (lbn[p].d == LOW)
         {
            mx = lbn[p].x;
            my = lbn[p].y;
            if (nm > 0)
               output += "*\nquadratic 0 1 spinby man mlfoot mpelvis "+ (ji-1)*45+" y\n";
         }
         else
         {
            wx = lbn[p].x;
            wy = lbn[p].y;
            if (nw > 0)
               output += "*\nquadratic 0 1 spinby woman wrfoot wpelvis "+ (ji-1)*45+" y\n";
         }
         if ((wx > 0)&&(mx > 0)&&(wy > 0)&&(my > 0))
         {
            dx = ((wx - mx)*2)/3;
            dz = (wy - my)/2;
            if (nmw > 0)
            {
               output += "*\n";
               output += "repeat 0 1 centre mpelvis kx ky kz\n";
               output += "repeat      0   1 moveto woman    wpelvis kx ky kz\n";
               output += "repeat      0   1 axes   wpelvis  cx cy cz\n";
               output += "linear      0   1 set    dx "+dx+"\n";
               output += "linear      0   1 set    dz "+dz+"\n";
               output += "linear      0   1 mult   wx   dx  cx\n";
               output += "linear      0   1 mult   wz   dz  cx\n";
               output += "repeat      0   1 centre wpelvis  cx cy cz\n";
               output += "repeat      0   1 centre wpelvis  cx cy cz\n";
               output += "repeat      0   1 centre wpelvis  cx cy cz\n";
			   output += "repeat      0   1 set    fpos     1\n";
               output += "repeat      0   1 call   noposn\n";
            }
         }
      }
   }
} /* lstart */
/***********************************************/
   

var lsetrange = function()
/*
   set range of symbols to be interpreted

   called by linter,
*/
{
   var bend;
   var k,kmax;
   var ymax;

   ystart = 0;
   yend = lbn[0].y;
   ymax = yend;
   sstart = 0;
   ssend = nlabs;
   for (k = 0; k < nlabs; ++k)
   {
      if (lbn[k].m == Bars)
      {
         if (lbn[k].i == bstart)
         {
            sstart = k;
            ystart = lbn[k].y;
         }
      }
   }
   bend = bstart + blength;
   for (k = (sstart+1); k < nlabs; ++k)
   {
      if (lbn[k].m == Bars)
      {
         if (lbn[k].i == bend)
            ssend = k;
      }
   }
   for (k = 0; k < nlabs; ++k)
   {
      if (lbn[k].m == Dirn)
      {
         if (lbn[k].y > yend)
            yend = lbn[k].y;
         if ((lbn[k].y+lbn[k].h) > ymax)
		 {
            ymax = lbn[k].y+lbn[k].h;
			kmax = k;
		 }
      }
   }
   fmax = 2 + int(lbn_fpp*double(ymax));
	console.log("\n   lsetrange: pixels "+ymax+", frames "+fmax+"\n");
} /* lsetrange */
/****************************************************/

var lcopyfigs = function()
/*
   finish off

   called by linter,
   calls     lgetout,
*/
{
	
   var figsname = "lintel.n";
   
	var done = false;
	getFileFromServer(figsname, function(text) {
		if (text === null) {
			printf("\n\noops %s not in folder\n",figsname);
			  lgetout(1);
			  if (ok == 1) return;
		} else {
			//TODO REVIEW THIS CODE
			output += text;
			done = true;
		}
	});
	while (done == false) {}
} /* lcopyfigs */
/********************************************/

var lfinish = function()
/*
   finish off

   called by linter,
   calls lgetout,
*/
{
   fmax += 2;
   output += "*\n";
   output += "**************************\n";
   output += "*\n";
   if (nm > 0)
      output += "repeat      0 "+leadingZeros(fmax, 3)+" ground man\n";
   else
      output += "repeat      0   1 moveto man    mlfoot  10000 10000 10000\n";
   if (nw > 0)
      output += "repeat      0 "+leadingZeros(fmax, 3)+" ground woman\n";
   else
      output += "repeat      0   1 moveto woman  wlfoot  10000 10000 10000\n";
   if (nm > 0)
      output += "repeat      0 "+leadingZeros(fmax, 3)+" centre mpelvis fx fy fz\n";
   else
      output += "repeat      0 "+leadingZeros(fmax, 3)+" centre wpelvis fx fy fz\n";
   if (track == TRUE)
   {
	   output += "repeat      0 "+leadingZeros(fmax, 3)+" add     fy -900 fz\n";
       output += "repeat      0 "+leadingZeros(fmax, 3)+" place   fx  500 fy\n";
   }
   output += "repeat      0 "+leadingZeros(fmax, 3)+" observe -9    0  0\n*\n";
   output += "end dance\n****************************\n";
   output += "*\nsubroutine setfmax\n";
   output += "*\nrepeat 0 1 set fmax "+fmax+"\n";
   output += "*\nend setfmax\n";
   output += "****************************\n*\nstop\n";
   if (nbar > 0)
         frperbar = fmax/nbar;
   else
         frperbar = 0;
} /* lfinish */
/********************************************/

var lselectfig = function()
/*
   select figure

   called by linter,
*/
{   
   var k;
   var nf;
   var nogo;
   var st;
   var stv0,stv1,st4;
   var stv = new Array();	//[2]
   var key;

	//TODO REVIEW (Was a lot of GOTOs, now a WHILE loop)
	var again = true;
	while(again == true){
		again = false;
	   for (k = 0; k < nstaff; ++k)
		  staff[k][5] = DONE;
	   nf = 0;
	   nm = 0;
	   nw = 0;
	   nogo = FALSE;
	   if (nstaff < 1)
		  console.log("no staves\n");
	   else
	   if (nstaff == 1)
	   {
		  staff[0][5] = TODO;
		  if (staff[0][4] == MAN) 
			 ++nm;
		  else
			 ++nw;
	   }
	   else
	   if (nstaff > 1)
	   {
		  nmw = 0;
		  if (nstaff > TMAX)
			 console.log("This can only interpret staves from 1 to "+ 		    TMAX+"\n");
		  if (lbn_figures == 2)
		  {
			 stv[0] = 1; stv[1] = 2;
			 track = TRUE;
		  }
		  else // (lbn_figures != 2)
		  {
			 console.log("\nPlease type the number of staves to be interpreted\n");
			 if (gets(buf) == NULL)
			 {
				console.log("OOPS: cannot open standard input\n");
				lgetout(1);
				nogo = TRUE;
				if (ok == 1){
					break;
				}
			 }
			 sscanf(buf,"%d",lbn_figures);
			 if (lbn_figures > 2)
			 {
				console.log("sorry; this program can only interpret 2 staves at a time\n");
				nogo = TRUE;
				again = true;
				continue;
			 }
			 if (lbn_figures == 1)
				console.log("Please enter the staff number to be interpreted\n");
			 else
			 {
				console.log("Please enter staff numbers to be interpreted\n");
				console.log("separated by a space, and followed by the 'enter' key.\n\n");
			 }
			 if (gets(buf) == NULL)
			 {
				console.log("OOPS: cannot read staff numbers\n");
				lgetout(1);
				nogo = TRUE;
				if (ok == 1){
					break;
				}
			 }
			 if (lbn_figures == 1)
			 {
				sscanf(buf,"%d",stv0); 
				stv[0] = stv0; stv[1] = -1;
			 }
			 else
			 {
				sscanf(buf,"%d %d",stv0,stv1); 
				stv[0] = stv0; stv[1] = stv1;
			 }
		  } /* lbn_figures != 2 */
		  for (nf = 0; nf < lbn_figures; ++nf)
		  {
				st = stv[nf]-1;
				if ((st < 0)||(st > nstaff))
				{
					console.log("OOPS: staff number "+(st+1)+" out of range\n");
					again = true;
					continue;
				}
				st4 = staff[st][4];
				if ( ((nm > 0)&&(st4 == MAN))
				   ||((nw > 0)&&(st4 == WOMAN)) )
				{
					console.log("Sorry: can only do one man and/or one woman.");
					console.log("Please select again.\n");
					nogo = TRUE;
				 } /* more than 1 man or woman */
				 else
				 {
					if (st4 == WOMAN) ++nw;
					if (st4 == MAN) ++nm;
					staff[st][5] = TODO;
				 } /* a man or woman */  
				 nmw = nm*nw;
		   } /* nf */
	   } /* nstaff > 1 */
	   if (nogo == TRUE){
			again = true;
			continue;
		}
	}

   if (lbn_figures != 2)
   {
       track = TRUE;
       console.log("Track main figure? Hit 'enter' for Yes, any other key for No\n");
       key = getchar(); 
       if (key != '\n')
          track = FALSE;
   }
   else
       track = TRUE;
   if (track == FALSE)
       console.log("\n   tracking OFF\n");
   else
       console.log("\n   tracking ON\n");
} /* lselectfig */
/***********************************************/
//END PORT ON 2013-12-09 (Errorage)

//PORT ON 2013-12-10 (Errorage)
var ldobar = function()
/*
   write bar number out

   called by laction,
*/
{
   if ((jm == Bars) && (jy < yend))
   {
      ++nbar;
      output += "*\n";
	  output += "***************************\n";
      output += "*\n";
      output += "*   bar "+nbar+"\n";
      output += "*   bar "+nbar+"\n";
   }
} /* ldobar */
/********************************************/

var lbent = function()
/*
   for Volm symbol : flag next 'Dirn' symbol above
   
   called by laction,
   calls lassign,

   Volm   1  RELAX
   Volm   3  BENT
   Volm   2  STRAIGHT
   Volm   4  STRETCH
   Volm   7  hold
*/
{
   var g;
   var k;
   var ki,kx,kx2,ky,ky2;
   var jy2h;
   var km;

   for (j = 0; j < ssend; ++j)
   {
      if ((lbn[j].m == Volm)&&(lbn[j].i <= STRETCH)) 
      {
         lassign();
         jy2h = jy2+jh;
         g = -1;
         for (k = j+1;	((k < nlabs)&&(g < 0)); ++k)
         {
            km = lbn[k].m;
            if ((km == Dirn)&&(lbn[k].a == TODO))
            {
               ky = lbn[k].y;
               if (ky > jy2h)
                  g = 0;
               else
               {
                  ky2 = lbn[k].y2;
                  kx = lbn[k].x;
                  kx2 = lbn[k].x2;
                  if ((loverlap(jx,jx2,kx,kx2) > 0)
                     &&(loverlap(jy2,jy2h,ky,ky2) > 0))
                  {
                      g = k;
                      lbn[j].b = ji;
                      ki = lbn[k].i;
                      lbn[j].m = km;
                      lbn[j].i = ki;
                      lbn[j].y2 = ky2;
                      lbn[j].h = lbn[k].y2 - jy;
                      lbn[j].d = lbn[k].d;
                      lbn[k].a = DONE;
                      if (ji == BENT)
                      {
                         if ((ki == 11)&&(jc < 0))
                            lbn[j].i = 8;
                         else
                         if ((ki == 11)&&(jc > 0))
                            lbn[j].i = 3;
                      } /* ji == BENT */
                  } /* overlapping */
               } /* ky < jy2h */
            } /* km = Dirn */
         } /* k */
      } /* jm = Volm */
   } /* j */
} /* lbent */
/********************************************/

var lrelease = function()
/*
   release the hold when jm = Misc

   called by laction,
   	  Assumes one of the following holds:

	  So far:
   NO  - no hold: arm gestures apply.
   CL  - closed hold: normal ballroom dancing position.
   SS  - semi-shadow hold: both facing same way, bodies touching, 
         man's L hand to lady's L hand,
         man's R hand to front of lady's R hip,
		 lady's R hand free.
   OE  - open extended hold: both facing same way, bodies apart,
         man's R hand to lady's L hand, other hands free.
   CO  - counter open extended hold: both facing same way, bodies apart,
         man's L hand to lady's R hand, other hands free.
   SH  - shadow hold: both facing same way, bodies touching,
         L hand to L hand, R hand to R hand.

      later to do:
   PR  - promenade position: facing partner, bodies touching,
         but both prepared to travel to man's L.
   CP  - counter promenade position: facing partner, bodies touching,
         but both prepared to travel to man's R.
   DB  - double hold: facing partner, bodies apart,
         L hand to R hand, R hand to L hand.
   OP  - open hold: facing partner, bodies apart,
         man's L hand to lady's R hand, other hands free.
   CR  - crossed open hold: facing partner, bodies apart,
         man's R hand to lady's R hand, other hands free.

	Relevant symbols:-
     m     i
    Misc   1  bow
    Misc   2  release1
    Misc   3  release2
    Limb   4  lhand
    Limb   9  rhand
    Area   1  top/front 
    Area   5  back/bottom
    Volm   1  RELAX
    Volm   3  BENT
    Volm   2  STRAIGHT
    Volm   4  STRETCH
    Volm   7  hold

    FRONT   100         // front symbol found
    BACK    200         // back symbol found
    MLHAND    1         // man's left hand symbol found
    MRHAND    2         // man's right hand symbol found
    WLHAND   10         // woman's left hand symbol found
    WRHAND   20         // woman's right hand symbol found
*/
{
   var fdif;
   var fbegin,ffin;

   if ((nmw > 0)&&(ji == 2)) // release
   {
      holdcl = 0;
      holdoe = 0;
      holdco = 0;
      holdpr = 0;
      holdsh = 0;
      holdss = 0;
      fbegin = pend;
      ffin = fend;
      if (ffin <= fbegin) ffin = fbegin + 1;
      fdif = ffin - fbegin;
      if ((st > 0) && (hold != NO))
      {
         output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" set fpos "+fdif+"\n";
         output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" noposn\n*\n";
      }
      hold = NO;
      output += "* lreleasea "+             fstart+" "+fend+" "+j+" "+jb+" "+hold+" "+prevhold+"\n";
      keptf = ffin;
   }
} /* lrelease */
/******************************************/

var ldoposn = function()
/*
   set up a couple dance position

   called by lsethold, ldohold
*/
{
	  fbegin = fstart;
	  ffin = fend;
		output += "** ldoposn "+leadingZeros(fbegin,3)+" "+leadingZeros(ffin,3)+", "+leadingZeros(st,3)+" "+leadingZeros(hold,3)+"\n";
		
      if (st > 0)
      {
			flen = ffin - fbegin;
			if (flen < 1) flen = 1;
			if (hold != NO) 
            output += "repeat    "+leadingZeros(                   fbegin, 3)+" "+leadingZeros(ffin, 3)+" set    fpos "+leadingZeros(flen, 3)+"\n";
			if (hold == PR)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" prposn\n*\n";
			else
			if (hold == CO)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" coposn\n*\n";
			else
			if (hold == CL)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" clposn\n*\n";
			else
			if (hold == SS)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" ssposn\n*\n";
			else
			if (hold == OE)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" oeposn\n*\n";
			else
			if (hold == SH)
            output += "call      "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" shposn\n*\n";
			keptf = ffin;
			prevhold = hold;
      } /* st > 0 */
} /* ldoposn */
/*******************************************/

var ldokeep = function()
/*
   maintain a couple dancing position

   called by dohold,
*/
{
		output += "** ldokeep "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" "+leadingZeros(hold, 3)+"\n";
         if (hold == PR)
            output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   prkeep\n*\n";
         else
         if (hold == CL)
		     output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   clkeep\n*\n";
         else
         if (hold == OE)
            output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   oekeep\n*\n";
         else
         if (hold == SS)
            output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   sskeep\n*\n";
		 else
         if (hold == CO)
            output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   cokeep\n*\n";
         else
         if (hold == SH)
            output += "repeat    "+leadingZeros(fbegin, 3)+" "+leadingZeros(ffin, 3)+" call   shkeep\n*\n";
         keptf = ffin;
}   /* ldokeep */
/******************************************/

var ldohold = function()
/*
    set up and maintain holds
	
	called by laction,
	calls ldokeep, ldoposn,
*/
{
   fbegin = keptf;
   ffin = pend;
		output += "** ldohold "+leadingZeros(fbegin,3)+" "+leadingZeros(ffin ,3)+","+leadingZeros(hold,3)+" "+leadingZeros(prevhold,3)+"\n";
   if (prevhold == hold) 
   {
	   fbegin = keptf;
      if (fbegin < ffin) ldokeep();
   } /* prevhold == hold */
   else
   {
      ldoposn();
   } /* prevhold != hold */
} /* ldohold */
/*************************************************/

var lsethold = function()
/*
   set the hold if jm = Limb or jm = Face

   called by laction,
   calls ldoposn,

      Uses the hand signs to determine the holds if any.
   	  Assumes one of the following holds:

	  So far:
   NO - no hold: arm gestures apply.
   CL - closed hold: normal ballroom dancing position.
   SS - semi-shadow hold: both facing same way, bodies touching, 
        man's L hand to lady's L hand,
        man's R hand to front of lady's R hip,
         ady's R hand free.
   OE - open extended hold: both facing same way, bodies apart,
        man's R hand to lady's L hand, other hands free.
   CO - counter open extended hold: both facing same way, bodies apart,
        man's L hand to lady's R hand, other hands free.
   SH - shadow hold: both facing same way, bodies touching,
        L hand to L hand, R hand to R hand.
   PR - promenade position: diagonally facing partner,
        bodies touching, both travelling to man's L.
   CP - counter promenade position: facing partner, bodies touching,
        but both prepared to travel to man's R.
   DB - double hold: facing partner, bodies apart,
        L hand to R hand, R hand to L hand.
   OP - open hold: facing partner, bodies apart,
        man's L hand to lady's R hand, other hands free.
   CR - crossed open hold: facing partner, bodies apart,
        man's R hand to lady's R hand, other hands free.

#define NO        0        // no hold
#define CL        1        // closed hold
#define PR        2        // promenade position
#define CP        3        // counter promenade position
#define DB        4        // double hold
#define OP        5        // open hold
#define CR        6        // crossed open hold
#define OE        7        // open extended hold
#define CO        8        // counter open extended hold
#define SH        9        // shadow hold
#define SS       10        // semi-shadow hold 

	Relevant symbols:-
     m     i
    Misc   1  bow
    Misc   2  release1
    Misc   3  release2
    Limb   4  lhand
    Limb   9  rhand
    Area   1  top/front 
    Area   5  back/bottom
    Volm   1  RELAX
    Volm   3  BENT
    Volm   2  STRAIGHT
    Volm   4  STRETCH
    Volm   7  hold

#define FRONT   100         // front/top symbol found
#define BACK    200         // back symbol found
#define MLHAND    1         // man's left hand symbol found
#define MRHAND    2         // man's right hand symbol found
#define WLHAND   10         // woman's left hand symbol found
#define WRHAND   20         // woman's right hand symbol found
*/
{
   var i,n;
   var dy,ylap;

   prevhold = hold;
   mface = -1;
   wface = -1;
   facedif = -1;
	if ((jm == Face)&&(oriented == FALSE)&&
		(((dofig == MAN)&&(jc < 0))||(dofig == WOMAN)&&(jc > 0)))
	{
		output += "linear    "+leadingZeros(0,3)+" "+leadingZeros(1,3)+" spinby fig    afoot  pelvis "+leadingZeros(((ji-1)*45),3)+" y\n";
		oriented = TRUE;
	}
   if ((jm == Limb)&&((ji == 4)||(ji == 9)))
   {
      if (jb ==  11) { ++holdss; ++holdsh; }
      if (jb ==  12) ++holdoe;
      if (jb ==  21) { ++holdco; ++holdcl; ++holdpr; }
      if (jb ==  22) ++holdsh;
      if (jb == 110) { ++holdcl; ++holdpr; }
      if (jb == 102) ++holdss;
      if (jb == 120) ++holdss;
      if (jb == 202) { ++holdcl; ++holdpr; }
   } /* jm = a hand */
   else
   if ((jm == Face)&&(jx > stmiddle))
   {
      n = -1;
      ylap = -1;
      wface = ji;
      for (i = 1; i < 9; ++i)
      {
         n = lseeksym(Face,i,xmin,stmiddle,jy,jy2);
         if (n >= 0)
         {
            dy = loverlap(jy,jy2,lbn[n].y,lbn[n].y2);
            if (dy > ylap)
            {
               ylap = dy;
               mface = i;
            }
         } /* found man facing sign */
      }
      if (mface >= 0)
      {
         facedif = mface - wface;
         if (facedif < 0) facedif += 8;
         if (facedif > 7) facedif -= 8;
      }
      else
         facedif = -1;
      if (facedif == 0)
      {
         facecl = 0;
         facepr = 0;
         facesh = 1;
         facess = 1;
      } /* facing same way */
      else
      if (facedif == 2)
      {
         facecl = 0;
         facepr = 1;
         facesh = 0;
         facess = 0;
      } /* facing at right angles */
      else
      if (facedif == 4)
      {
         facecl = 1;
         facepr = 0;
         facesh = 0;
         facess = 0;
      } /* facing opposite ways */
   } /* jm == Face */
   if (holdoe > 1) if (hold != CO) hold = OE;
   if (holdco > 1) if (hold != OE) hold = CO;
   if ((facesh+holdsh) > 4) hold = SH;
   if ((facess+holdss) > 4) hold = SS;
   if ((facepr+holdpr) > 4) hold = PR;
   if ((facecl+holdcl) > 4) hold = CL;
	output += "** lsethold "+hold+" "+prevhold+",  "+facesh+" "+holdsh+",  "+facess+" "+holdss+",  "+facepr+" "+holdpr+",  "+facec1+" "+holdc1+", "+leadingZeros(mface,3)+" "+leadingZeros(wface,3)+" "+leadingZeros(facedif,3)+"\n";
   if (prevhold != hold) ldoposn();
} /* lsethold */
/********************************************/

var ldochest = function(piv)
/*
   rotate the chest and stomach
   
   called by ldolimb,
*/
{
   if (piv == 0)
   {
	   output += "quadratic "+leadingZeros(              fstart, 3)+" "+leadingZeros(fend, 3)+" bendto chest   ribs  stomach 0 0 0\n";
	   output += "quadratic "+leadingZeros(              fstart, 3)+" "+leadingZeros(fend, 3)+" bendto stomach waist pelvis 0 0 0\n";
   } /* piv == 0 */
   else
   {
      if (dofig == MAN)
         output += "quadratic "+leadingZeros(              fstart, 3)+" "+leadingZeros(fend, 3)+" rotate chest   ribs "+leadingZeros(-piv/2, 3)+"\n";
      else
	      output += "quadratic "+leadingZeros(              fstart, 3)+" "+leadingZeros(fend, 3)+" rotate chest   ribs "+leadingZeros(piv/2, 3)+"\n";
      output += "quadratic "+leadingZeros(           fstart, 3)+" "+leadingZeros(fend, 3)+" rotate stomach waist "+leadingZeros(piv/2, 3)+"\n";
   } /* piv != 0 */
} /* ldochest */
/******************************************/

var ldolimb = function()
/*
   do something to some body part
   
   called by laction,
   calls ldoarms, ldochest,

	Volm 7 + Area 9 = chest
*/
{
	var nc;
	var piv;

	nc = jc+8;
	piv = -1;
	if ( (colm[nc] == ARM)&&(jm == Dirn)&&
		((hold == NO)||(hold == OE)||(hold == CO)) )
        ldoarms();
	else
	if (jm == Limb)
		colm[nc] = Limb;
	else
	if ((jm == Volm)&&(ji == 7)
		&&(colm[nc] == Area)&&(jd == BLANK))
	{
		colm[nc] = CHEST;
	   output += "* ldolimba CHEST at column "+nc+"\n";
	}
	else
	if ((jm == Area)&&(ji == 9)
		&&(colm[nc] == Volm)&&(jd == BLANK))
		colm[nc] = CHEST;
	else
	if ((jm == Area)&&(ji == 9))
		colm[nc] = Area;
	else
	if ((jm == Volm)&&(ji == 7))
		colm[nc] = Volm;
	else
	if ((jm == Rotn)&&(colm[nc] == CHEST))
	{
		piv = lgetpin();
		ldochest(piv);
	}
} /* ldolimb */
/*********************************************/

//var lcoords = function(char jm, int ji)
var lcoords = function(jm, ji)
/*
	check for change of coordinates

	called by laction,
	calls lseeksym, lgetpin

	Relevant symbols:-
	m      i
	Volm   5  space hold
	Volm   6  coordinates
	Volm   7  body hold
	Area   9  square
	Pins   1  forward
	Pins   5  backward
	
	 1 Aug 2006 checking piv against maxint
	30 Jul 2006 writing bendtos for mspace and wspace
*/
{
	var k;
	var piv;

	if ((jm == Area)&&(ji == 9))
	{
		piv = lgetpin ( );
		//fprintf(nudesfile,"* lcoordsa %c %d\n",m,piv);
		if (piv != maxint)
		{
			if (piv == 360) piv = 0;
			//coordinates = SPACE;
			if ( dofig == MAN )
			{
				output += "repeat "+ 					fstart+" "+ fend+" bendto mspace jman joist 270 0 "+ piv+"\n";
			   mspace = true;
			}
			else
			{
				output += "repeat "+ 					fstart+" "+ fend+" bendto wspace jwoman joist 270 0 "+ piv+"\n";
				wspace = TRUE;
			}
		} /* space stance found */
	} /* possible space stance found */
	else
	{
		k = lseeksym(Volm,7,jx,jx2,jy,jy2);
		if (k > 0)
		{
			//coordinates = BODY;
			if ( dofig == MAN )
			   mspace = false;
			else
				wspace = FALSE;
		} /* body stance found */
		//fprintf(nudesfile,"* lcoordsb mspace wspace TRUE\n",
			//mspace,wspace,TRUE);
	} /* possible body stance found */
}  /* lcoords */
/*****************************************/

var ldotoetaps = function()
/*

	do toe taps with gestures of the legs
	doing diagonals sideways at present

	Volm   1  RELAX
	Volm   3  BENT
	Volm   2  STRAIGHT
	Volm   4  STRETCH
	Volm   7  hold

	called by laction,
	calls lgetout, lsetframes, bell,

	19 Aug 2006 d076- Don Herbison-Evans
*/
{
	if ( (( jc == -3 )||( jc == 3 )) && ( jd == -1 ) )
	{
			output += "*\n";
			if  ( ji==11 )
				output += "* in place tap\n";
			else if ( ( ji == 1 ) || ( ji == 10 ) )
				output += "* forward tap\n";
			else if ( ( ji == 2 ) || ( ji == 9 ) )
				output += "* forward diagonal tap\n";
			else if ( ( ji == 3 ) || ( ji == 8 ) )
				output += "* sideways tap\n";
			else if ( ( ji == 4 ) || ( ji == 7 ) )
				output += "* back diagonal tap\n";
			else if ( ( ji == 5 ) || ( ji == 6 ) )
				output += "* backward tap\n";
			//
			if ( dofig == MAN )
			{
				if (mspace == false)
					output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" set    coords mpelvis\n";
				else
					output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" set    coords mspace\n";
			}
			else
			{
				if (wspace == FALSE)
					output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" set    coords wpelvis\n";
				else
					output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" set    coords wspace\n";
			}
			//
			if ( jc < 0 )
			{
				if ( ( ji <= 1 ) || ( ji == 3 ) || ( ji == 5 ) || ( ji > 11 ) )
				{
					console.log("OOPS: ldotoetap left direction problem line "+ j +"\n");
					console.log(""+leadingZeros( jm, 3)+" "+leadingZeros( ji, 3)+" "+leadingZeros( jx, 3)+" "+leadingZeros( jy, 3)+" "+leadingZeros( js, 3)+" "+leadingZeros( jw, 3)+" "+leadingZeros( jh, 3)+" "+leadingZeros( jb, 3)+" "+ jd +"\n");
					lgetout ( 1 );
					if ( ok == 1 ) return;
				} /* i wrong */
				output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" call   forleft * left = b\n";
			} /* left side */
			else if ( jc > 0 )
			{
				if ( ( ji < 1 ) || ( ji == 6 ) || 
					( ji == 8 ) || ( ji == 10 ) || ( ji > 11 ) )
				{
					console.log("OOPS: ldotoetap right direction problem line "+ j +"\n");
					console.log(""+leadingZeros( jm, 3)+" "+leadingZeros( ji, 3)+" "+leadingZeros( jx, 3)+" "+leadingZeros( jy, 3)+" "+leadingZeros( js, 3)+" "+leadingZeros( jw, 3)+" "+leadingZeros( jh, 3)+" "+leadingZeros( jb, 3)+" "+ jd +"\n");
					lgetout ( 1 );
					if ( ok == 1 ) return;
				} /* i wrong */
				output += "repeat    "+leadingZeros(fstart,3)+" "+leadingZeros(fend,3)+" call   forright * right = b\n";
			} /* right side */
//
			if ( ji == 11 )
			{
			
				output += "repeat    "+leadingZeros( 					fstart, 3)+" "+leadingZeros( fend, 3)+" call   "+ risesub[rise] +"\n";
				output += "repeat    "+leadingZeros( 					fstart, 3)+" "+leadingZeros( fend, 3)+" set    fend  "+ frange +"\n";
				output += "linear    "+leadingZeros( 					fstart, 3)+" "+leadingZeros( fend , 3)+" bendto bleg   bknee  bthigh lrlx1 lrlx2 lrlx3\n";
			} /* close without weight */
			else
				output += "linear    "+leadingZeros( 					fstart, 3)+" "+leadingZeros( fend , 3)+" bendto bleg   bknee  bthigh lhig1 lhig2 lhig3\n";
			output += "linear    "+leadingZeros( 				fstart, 3)+" "+leadingZeros( fend , 3)+" drag   bfoot  bfoot  bankle bleg  x\n";
			lbn[j].a = DONE;
	} /* c OK */
} /* ldotoetaps */
/**************************************/

var laction = function()
/*
   run through and interpret the actions

   called by linter,
   calls     ldobar,   ldosteps, lleggesture, ldolimb,
             ldopivot, lbent,    lassign,  lsetframes,
             lsethold, ldohold,  lrelease, lface,

#define FRONT   100         // front symbol found
#define BACK    200         // back symbol found
#define MLHAND    1         // man's left hand symbol found
#define MRHAND    2         // man's right hand symbol found
#define WLHAND   10         // woman's left hand symbol found
#define WRHAND   20         // woman's right hand symbol found 
	
#define NO        0        // no hold
#define CL        1        // closed hold
#define PR        2        // promenade position
#define CP        3        // counter promenade position
#define DB        4        // double hold
#define OP        5        // open hold
#define CR        6        // crossed open hold
#define OE        7        // open extended hold
#define CO        8        // counter open extended hold
#define SH        9        // shadow hold
#define SS       10        // semi-shadow hold 

Relevant symbols:-
     m     i
    Misc   1  bow
    Misc   2  release1
    Misc   3  release2
    Limb   4  lhand
    Limb   9  rhand
    Area   1  top/front 
    Area   5  back/bottom
	 Area   9  square
    Volm   1  RELAX
    Volm   3  BENT
    Volm   2  STRAIGHT
    Volm   4  STRETCH
	 Volm   6  coordinates
    Volm   7  hold
    Face   n  facing direction

*/
{
	output += "*\n************************************\n";
	oriented = FALSE;
	if ( dofig == MAN )
		output += "*\nrepeat      0 "+leadingZeros( fmax , 3)+" call   doman\n";
	else
		output += "*\nrepeat      0 "+leadingZeros( fmax , 3)+" call   dowoman\n";
	for ( j = 0; j < NCOLM; ++j )
		colm[j] = ARM;
	for ( j = 0; j < ssend; ++j )
	{
		lassign ();
		lsetframes ();
		output += "* "+lbn[j].a+" "+leadingZeros(jc, 3)+" "+lbnline[j]+"";
		if ( lbn[j].a == TODO )
		{
			if ( jm == Bars )
				ldobar ();
			else if ( ( jm == Face ) || ( jm == Limb ) )
				lsethold ();
			else if ( jm == Misc )
			{
				lrelease ();
			}
			else if ( ( jc > -8 ) && ( jc < 8 ) )
			{
				if ( (( jm == Volm )&&( ji == 6 )) 
					||(( jm == Area )&&( ji == 9 )) )
						lcoords(jm, ji);
				if ( ( jm == Rotn ) && ( jc > -4 ) && ( jc < 4 ) )
					ldopivot ();
				else if (( jm == Dirn ) && ( jc > -4 ) && ( jc < 4 ))
				{
					ldostep ();
					lleggesture ();
					ldotoetaps ();
				}
				else
					ldolimb ();
			} /* jc OK */
		} /* ja == TODO */
		if (( (jm == Dirn)||(jm == Rotn) )&&(jc >= -6)&&(jc <= 6)
			&&( nmw > 0 )&&( dofig == WOMAN ) )
			ldohold ();
		pstart = fstart;
		pend = fend;
	} /* j */
} /* laction */
/*************************************************/

var linter = function()
/*
                     linter

      interpret labanotation score into a NUDES file
                version linter50.c

      input : LED Labanotation file:   standard input (led.lbn)
      output: NUDES animation script:  standard output (led.n)

   called by main,
   calls     lbnread, lsorty, lfindstaff, lstart, lhold,
             lfindystart, lcolx, lsetrange, lselectfig,
             lgetout, lcopyfigs, lfinish, lcopysubs,
             lbows,
*/
{
   lbnread();;
   lsorty();
   lfindstaff();
   lsetrange();
   lselectfig();
   lcopyfigs();
   lstart();
   lfindystart();
   lbows(); // flag hand signs
   lbent(); // flag dirn signs
   for (st = 0; st < nstaff; ++st)
   {
      hold = NO;
      holdcl = 0;
      holdco = 0;
      holdoe = 0;
      holdpr = 0;
      holdsh = 0;
      holdss = 0;
      facecl = 0;
      facepr = 0;
      facesh = 0;
      facess = 0;
      prevhold = -9;
      prevc = 0;
      pstart = -1;
      pend = -1;
      keptf = 0;
      gy = -1;
      gh = 0;
      if (staff[st][5] == TODO)
      {
         nbar = -1;
         if (staff[st][4] == MAN)
            dofig = MAN;
         else
            dofig = WOMAN;
         lcolx(staff[st][2]);
         laction();
         staff[st][5] = DONE;
      }
   }
   lfinish();
} /* linter */
/****************************************/

//var shift = function(double x, double y, double z)
var shift = function(x, y, z)
/*
   this adds 'x,y,z' to all centres and joints in lists
   'elist' and 'jlist'.

   called by  action, dogrofig, dogrojt, domovjnt,
              twirl, dodrag,
*/
{
   var e,j,n ;


   for (  n = 0 ; n < ecount ; ++ n )
   {
      e = elist[n] ;
      cen[e][0] += x ;
      cen[e][1] += y ;
      cen[e][2] += z ;
   }
   for (  n = 0 ; n < jcount ; ++ n )
   {
      j = jlist[n] ;
      jnt[j][0] += x ;
      jnt[j][1] += y ;
      jnt[j][2] += z ;
   }
}  /* shift */
/*****************************/

//var rset = function(double r[3][3], double angl, int axis)
var rset = function(r, angl, axis)
/*
   set up the rotation matrix 'r' for a rotation of
   'angl' radians about 'axis'.

   called by  input, setobs, dobalanc, dospinby,
*/
{
	  var v = new Array();	//v[5]
      var i,j,k;

      v[0] = doub0 ;
      v[1] = doub1 ;

/*   fill out values vector with sin and cos- */

	//TODO REVIEW (May be degrees or radians)
      v[2] = Math.cos(angl) ;
      v[3] = Math.sin(angl) ;
      v[4] = -v[3] ;

/*   choose appropriate permutation of values for rotation axis- */

      for (  i = 0 ; i < 3 ; ++ i )
      {
         for (  j = 0 ; j < 3 ; ++ j )
         {
            k = perm[axis][j][i] ;
            r[i][j] = v[k-1] ;
         }
      }
}  /* rset */
/************************************/

//var matmul = function(double a[3][3], double b[3][3], double c[3][3])
var matmul = function(a, b, c)
/*
     this multiplies matrix 'b' by 'a' and puts the product
     in 'ans'.

     called by  dobalanc, matrot, dospinto, dospinby, getwist.
                getaxes, sepn,  getmat,

	  21 Sep 2006  unrolled loops
*/
{
	var ans00,ans01,ans02,ans10,ans11,ans12,ans20,ans21,ans22;
//
	ans00 = a[0][0] * b[0][0] + a[0][1] * b[1][0] + a[0][2] * b[2][0];
	ans01 = a[0][0] * b[0][1] + a[0][1] * b[1][1] + a[0][2] * b[2][1];
	ans02 = a[0][0] * b[0][2] + a[0][1] * b[1][2] + a[0][2] * b[2][2];
	ans10 = a[1][0] * b[0][0] + a[1][1] * b[1][0] + a[1][2] * b[2][0];
	ans11 = a[1][0] * b[0][1] + a[1][1] * b[1][1] + a[1][2] * b[2][1];
	ans12 = a[1][0] * b[0][2] + a[1][1] * b[1][2] + a[1][2] * b[2][2];
	ans20 = a[2][0] * b[0][0] + a[2][1] * b[1][0] + a[2][2] * b[2][0];
	ans21 = a[2][0] * b[0][1] + a[2][1] * b[1][1] + a[2][2] * b[2][1];
	ans22 = a[2][0] * b[0][2] + a[2][1] * b[1][2] + a[2][2] * b[2][2];
//
	c[0][0] = ans00;
	c[0][1] = ans01;
	c[0][2] = ans02;
	c[1][0] = ans10;
	c[1][1] = ans11;
	c[1][2] = ans12;
	c[2][0] = ans20;
	c[2][1] = ans21;
	c[2][2] = ans22;
}  /* matmul */
/**********************************************************/

//var vecmul = function(double v[EMAX][3], double m[3][3], int n)
var vecmul = function(v, m, n)
/*
   multiply the 'n'th vector from array 'v'
   by matrix 'm'.

   called by touch, dogrojnt, domovjnt, domoveby, doabut,
             twirl,
*/
{
      var i,j ;
      var x;
	  var vv = new Array(); //vv[3]

      for (  i = 0 ; i < 3 ; ++ i )
      {
         x = doub0 ;
         for (  j = 0 ; j < 3 ; ++ j )
         {
            x = x+m[i][j]*v[n][j] ;
         }
         vv[i] = x ;
      }
      
      for (  i = 0 ; i < 3 ; ++ i )
      {
         v[n][i] = vv[i] ;
      }
}  /* vecmul */
/**********************************************/

//var rotget = function(double r[3][3], double unr[3][3], int n)
var rotget = function(r, unr, n)
/*
   form a rotation matrix r and its inverse unr
   from the nth entries in quat

   called by  dobalanc, matrot, dospinto, dospinby,
              dogrojnt, domovjnt, doabut, doground,
*/
{
      var i,j ;
      var cp,sp,x,y,z,m,xsp,ysp,zsp,xm,ym,zm,xym,xzm,yzm ;

      x = quat[n][0] ;
      y = quat[n][1] ;
      z = quat[n][2] ;
      sp = quat[n][3] ;
      cp = quat[n][4] ;
      m = doub1-cp ;
      xm = x*m ;
      ym = y*m ;
      zm = z*m ;
      xsp = x*sp ;
      ysp = y*sp ;
      zsp = z*sp ;
      xym = x*ym ;
      xzm = x*zm ;
      yzm = y*zm ;
      r[0][0] = x*xm+cp ;
      r[0][1] = xym+zsp ;
      r[0][2] = xzm-ysp ;
      r[1][0] = xym-zsp ;
      r[1][1] = y*ym+cp ;
      r[1][2] = yzm+xsp ;
      r[2][0] = xzm+ysp ;
      r[2][1] = yzm-xsp ;
      r[2][2] = z*zm+cp ;

      for (  i = 0 ; i < 3 ; ++ i )
      {
         for (  j = 0 ; j < 3 ; ++ j )
         {
            if ((r[j][i] > -tolr) && (r[j][i] < tolr)) r[j][i] = 0;
            unr[i][j] = r[j][i] ;
         }
      }
}  /* rotget */
/**************************************/

//var rotput = function(double r[3][3], int n)
var rotput = function(r, n)
/*
   interpret rotation matrix 'r' as direction cosines of a
   rotation axis, and the sine and cosine of a rotation about
   that axis, and store in array 'quat'.

   uses the fact that any rotation matrix can be written as -

   ( x.x.m+c    x.y.m-z.s  x.z.m+y.s )
   ( x.y.m+z.s  y.y.m+c    y.z.m-x.s )
   ( x.z.m-y.s  y.z.m+x.s  z.z.m+c   )

   where
     x,y,z-components of unit vector along rotation axis
             x=cos(a1)cos(a2)  y=cos(a1)sin(a2)  z=sin(a1)
             a1,a2-azimuth and elevation of axis from x axis
     s,c  -sine and cosine of rotation about that axis
     m     = 1-c

     x,y,z are stored in quat[n,0], quat[n,1], quat[n,2]
     s,c   are stored in quat[n,3], quat[n,4]

   see 'Control of round-off propagation in articulating the
        human figure', D.Herbison-Evans and D.S.Richardson,
        Computer Graphics and Image Processing,
        vol 17, pp. 386-393 (1981)

   called by matrot, dospinto, doangles, dolimb,
             getwist, store3,
*/
{
      var j,k ;
      //double a[3][3],b[3],d[3]
	  var a = get2DArray(3);
	  var b = new Array();
	  var d = new Array();
	  var e,f,g,c,s,trace ;
      var csq;

      b[0] = r[1][2]-r[2][1] ;
      b[1] = r[2][0]-r[0][2] ;
      b[2] = r[0][1]-r[1][0] ;
      e = b[0]*b[0]+b[1]*b[1]+b[2]*b[2] ;
      trace = r[0][0]+r[1][1]+r[2][2] ;
      if (e > doub0) g = sqrt(e); else g = doub0;
      if (e > tolr)
      {
         f = doub1/g ;
         quat[n][0] = f*b[0] ;
         quat[n][1] = f*b[1] ;
         quat[n][2] = f*b[2] ;
/*
     use g=2s, and trace=1+2c to find s and c -
*/
         s = inv2*g;
         csq = doub1-s*s;
         if (csq > doub0) c = sqrt(csq); else c = doub0;
         if (trace < doub1) c = -c;
         quat[n][3] = s ;
         quat[n][4] = c ;
      }
      else
/*
   symmetric matrix (180 or 360 degree rotation) -
*/
      {
         c = inv2*(trace-doub1);
         for (  j = 0 ; j < 3 ; ++ j )
         {
            d[j] = doub0 ;

/*   run across a row- */

            for (  k = 0 ; k < 3 ; ++ k )
            {
               a[j][k] = r[j][k]+r[k][j] ;
               if (j == k) a[j][j] = doub2*(r[j][j]-c) ;
               d[j] = d[j]+a[j][k]*a[j][k] ;
            }
         }

/*   choose most stable row- */

         j = 0 ;
         if (d[1] > d[0]) j = 1 ;
         if (d[2] > d[j]) j = 2 ;
         if (d[j] > doub0) f = doub1/sqrt(d[j]) ;
         else
         {
            f = doub1;
            a[j][0] = doub1;
         }
         quat[n][0] = f*a[j][0] ;
         quat[n][1] = f*a[j][1] ;
         quat[n][2] = f*a[j][2] ;
         quat[n][3] = inv2*g ;
         quat[n][4] = c ;
      }
      for (k = 0; k < 5; ++k)
      {
         if ((quat[n][k] > -tolr) && (quat[n][k] < tolr))
            quat[n][k] = 0;
         if (quat[n][k] >  doub1) quat[n][k] =  doub1;
         if (quat[n][k] < -doub1) quat[n][k] = -doub1;
      }
}  /* rotput */
/********************************************/

//var mkquat = function(int n, double a1, double a2, double a3)
var mkquat = function(n, a1, a2, a3)
/*
   convert angles a1,a2,a3 (in radians) into quat entries

   called by dospinto, inframe, 
*/
{
      var j;
      var s1,c1,s2,c2,s3,c3 ;

      s1 = sin(a1) ;
      c1 = cos(a1) ;
      s2 = sin(a2) ;
      c2 = cos(a2) ;
      s3 = sin(a3) ;
      c3 = cos(a3) ;
      quat[n][0] = c1*c2 ;
      quat[n][1] = s1*c2 ;
      quat[n][2] = s2 ;
      quat[n][3] = s3 ;
      quat[n][4] = c3 ;
      for (j = 0; j < 5; ++j)
         if ((quat[n][j] > -tolr) && (quat[n][j] < tolr)) quat[n][j] = 0;
}  /* mkquat */
/**********************************************************/


//var matrot = function(double r[3][3], int n)
var matrot = function(r, n)
/*
      this rotates the 'n'th ellipsoid by rotation matrix 'r'.

      called by twirl.
      calls     rotget, matmul, rotput,
*/
{
      //double ro[3][3],unro[3][3] ;
	  var ro = get2DArray(3);
	  var unro = get2DArray(3);
	  
      rotget(ro,unro,n) ;
      matmul(r,ro,ro) ;
      rotput(ro,n) ;
}  /* matrot */
/**********************************************/

//var twirl = new function(double x, double y, double z, double r[3][3])
var twirl = new function(x, y, z, r)
/*
   rotates all the rotation matrices 'quat', centres 'cen',
   and joint vectors 'jnt', of ellipsoids and joints in lists
   'elist' and 'jlist' about a point 'x,y,z' using rotation
   matrix 'r'.

   called by  dospinto, dospinby, store3,
   calls      shift, matrot, vecmul, setels,
*/
{
      var e,j,k ;

      shift(-x,-y,-z) ;
      if (ecount >= 0)
      {

/*   rotate the ellipsoids and their centres- */

         for (  e = 0 ; e < ecount ; ++e )
         {
            k = elist[e];
/*  don't rotate world ! :- */
            if (k != 0)
            {
               matrot(r,k) ;
               vecmul(cen,r,k) ;
            }
         }
      }

/*   now for the joints- */

      if (jcount >= 0)
      {
         for (  j = 0 ; j < jcount ; ++j )
         {
            k = jlist[j];
            vecmul(jnt,r,k) ;
         }
      }

/*   put body part back where it came from- */
      shift(x,y,z) ;
}  /* twirl */
/*****************************/

//var dospinto = function(double xx[3], int refell, double ang[3], double pro)
var dospinto = function(xx, refell, ang, pro)
/*
     spins all ellipsoids in 'elist' and joints in 'jlist'
     so that 'ellpsd' is proportion 'pro' of the way to the
     orientation specified as a rotation 'ang' radians
     about axes of the reference ellipsoid 'refell'
     about point 'xx'.

   called by  action, dodrag,
   calls      rotget, rotput, mkquat, matmul, twirl,
*/
{
      var alfa,nualfa;
      //double mv[3][3],unmv[3][3];
      //double rf[3][3],unrf[3][3];
      //double tg[3][3],untg[3][3];
      //double mt[3][3],nu[3][3];
	  
	  var mv = get2DArray(3);
	  var unmv = get2DArray(3);
	  var rf = get2DArray(3);
	  var unrf = get2DArray(3);
	  var tg = get2DArray(3);
	  var untg = get2DArray(3);
	  var mt = get2DArray(3);
	  var nu = get2DArray(3);
/*
   set rotation matrices of moving and reference ellipsoids -
*/
      rotget(mv,unmv,ellpsd);
      rotget(rf,unrf,refell);

/*   find target rotation matrix, and refer to refell- */

      mkquat(EMAX+1,ang[0],ang[1],ang[2]);
      rotget(tg,untg,EMAX+1);
      matmul(rf,tg,tg);

/*   find increment rotation matrix to reach target- */

      matmul(tg,unmv,mt);
      rotput(mt,EMAX+1);
      if (( quat[EMAX+1][3] == doub0 ) 
		  && ( quat[EMAX+1][4] == doub0 ))
      {
         ok = 53;
		 printf("dospinto no sine and cosine");
         alfa = doub0;
      }
      else alfa = atan2(quat[EMAX+1][3],quat[EMAX+1][4]) ;
      nualfa = pro*alfa ;
      if (alfa > pi ) nualfa = pro*(alfa - twopi);
      if (alfa < -pi) nualfa = pro*(alfa + twopi);
      quat[EMAX+1][3] = sin(nualfa);
      quat[EMAX+1][4] = cos(nualfa);
      rotget(nu,mt,EMAX+1);
      twirl(xx[0],xx[1],xx[2],nu);
}  /* dospinto */
/*************************************/

//var dospinby = new function(double xx[3], int refell, double angl, int axis)
var dospinby = function(xx, refell, angl, axis)
/*
   spins all ellipsoids and joints in 'elist' and 'jlist'
   about a point 'x', by an angle 'angl' radians relative to
   an 'axis' of reference ellipsoid 'refell'.

   called by dobalanc, action, dobend, dotouch, fun, dodrag,
   calls     rset, rotget, matmul, twirl,
*/
{
      var j,k = 0;
      //double r[3][3],ro[3][3],unro[3][3];
	  var r = get2DArray(3);
	  var ro = get2DArray(3);
	  var unro = get2DArray(3);
/*
        do transformation on required coordinates
        aligned with axes of the reference ellipsoid-
*/
      rset(r,angl,axis);
      rotget(ro,unro,refell);
      matmul(r,unro,r);
      matmul(ro,r,r);
      for (j = 0; j < 3; ++j)
         for (k = 0; k < 3; ++k)
            if ((r[j][k] > -tolr) && (r[j][k] < tolr)) r[j][k] = 0;
      twirl(xx[0],xx[1],xx[2],r);
}  /* dospinby */
/**********************************************************/

//var mkang = function(int n)
var mkang = function(n)
/*
   get angles in radians from 'n'th entry in 'quat' into 
   array 'ang'.

   called by  doangles, store3, storeang,
*/
{
      var x,y,z,s1,c1,m1 ;
      var j;

      x = quat[n][0] ;
      y = quat[n][1] ;
      z = quat[n][2] ;
      s1 = z ;
      m1 = doub1-z*z ;
      if (m1 > doub0) c1 = sqrt(m1) ;
         else c1 = doub0 ;
      if ((x == doub0 ) && ( y == doub0))
          ang[0] = doub0;
      else
          ang[0] = atan2(y,x) ;
      if ((s1 == doub0 ) && ( c1 == doub0))
      {
          ok = 54;
          printf("mkang: n %d, s1 %f, c1 %f",            
              n,s1,c1);
          ang[1] = doub0;
      }
      else ang[1] = atan2(s1,c1) ;
      if ((quat[n][3] == doub0 ) && ( quat[n][4] == doub0))
      {
          ok = 52;
          printf("mkang: n %d, quat[n][3] %f, quat[n][4] %f",            
              n,quat[n][3],quat[n][4]);
          ang[2] = doub0;
      }
      else 
	  ang[2] = atan2(quat[n][3],quat[n][4]) ;
      for (j = 0; j < 3; ++j)
      {
         if (ang[j] < doub0) ang[j] += twopi;
         if (ang[j] > twopi) ang[j] -= twopi;
      }
}  /* mkang */
/*****************************************/

//var storeang = function(int f, int e, double a1, double a2, double a3)
var storeang = function(f, e, a1, a2, a3)
/*
   convert angles a1,a2,a3 in degrees into quaternions
   and find direction vector of y axis
   for frame f and ellipsoid e

   called by store3,
*/
{
      var s1,c1,s2,c2,s3,c3;

      s1 = sin(a1) ;
      c1 = cos(a1) ;
      s2 = sin(a2) ;
      c2 = cos(a2) ;
      s3 = sin(a3) ;
      c3 = cos(a3) ;

      qu3[f][e][0] = a3*degree ;
      qu3[f][e][1] = c2*c1 ;
      qu3[f][e][2] = c2*s1 ;
      qu3[f][e][3] = -s2 ;

}  /* storeang */
/**********************************************************/

//var doangles = function(int el, int re, double val[EMAX], int var0, int var1, int var2)
var doangles = function(el, re, val, var0, var1, var2)
/*
  store the angles of 'el' relative to 're' in 'val' array.
  in degrees.

  called by action, dodrag,
  calls  matmul, rotget, rotput, mkang,
*/
{
   //double mvro[3][3],mvunro[3][3];
   //double stro[3][3],stunro[3][3];
   //double r[3][3];
   var mvro = get2DArray(3);
   var mvunro = get2DArray(3);
   var stro = get2DArray(3);
   var stunro = get2DArray(3);
   var r = get2DArray(3);

   rotget(stro,stunro,re) ;
   rotget(mvro,mvunro,el) ;
   matmul(stunro,mvro,r) ;
   rotput(r,EMAX) ;
   mkang(EMAX) ;
   val[var0] = ang[0]*degree ;
   val[var1] = ang[1]*degree ;
   val[var2] = ang[2]*degree ;
   if ((val[var0] > doub179)&&(val[var0] < doub181))
   {
	   val[var0] -= doub180;
	   val[var2] = -val[var2];
   }
   if (val[var1] > doub180) val[var1] -= doub360;
}  /* doangles */
/*********************************/

//var dobend = function(double angle, int axis)
var dobend = function(angle, axis)
/*
  implements flex(38), rotate(39), abduct(40).

  called by action,
  calls     dospinby,
*/
{
   var refell ;
   var left ;

   //TODO REVIEW (Was a strangely placed goto)
   refell = ellpsd ;
   if (!(t == rotate_keyword_code)){
	   if (ellpsd == coel[join][0]) refell = coel[join][1] ;
	   if (ellpsd == coel[join][1]) refell = coel[join][0] ;
/*
  assume odd-numbered ellipsoids are on left side of figure-
*/
	}
	if (((ellpsd-figell[fig])%2) == 0)
          left = TRUE; else left = FALSE;
/*
  flex-
*/
   if ((t == flex_keyword_code)&&(knee[join])) angle = -angle ;
/*
  rotate-
*/
   if ((t == rotate_keyword_code)&&( left == FALSE)) angle = -angle ;
/*
  abduct-
*/
   if ((t == abduct_keyword_code)&&(left == TRUE)) angle = -angle ;
   dospinby(xx,refell,angle,axis) ;
}  /* dobend */
/****************************************************/

/*   compl42.h - based on complu

     This translates a NUDES script into a compact
     form for use by 'perfrm'.

   subroutines-
      getout
      llength
      nexts
      match
      value
      addname
      getint
      inells
      injts
      inlims
      inname
      dojoin
      checkin
      valadd
      parset
      inperf
      compl
*/

/***************************************/

//var getout = function(int v)
var getout = function(v)
/*
   exit gracefully

   called by main, inlims, openfile, compl, nexts, doperfrm,
             initsphere, getkeys,
*/
{
   if (v != 0) 
   {
	   printf("lintel problem\nok error number %d\n",ok);
	   printf("line %d, action %d\n%s\n",
		   pp,p,aline[pp]);
   }
   if (infile) fclose(infile);
   ok = 1;
} /* getout */
/********************************************/

var llength = function()
/*
   find length of line

   called by nexts,
*/
{
   var j,sp;

   sp = 0;
   for ( j = 0; line[j] != null; ++j);
   {
      if (line[j] != blank) sp = j;
   }
   return(sp);
} /* llength */
/*******************************************/

//var nexts_a = function( char c ) (returns int)
var nexts_a = function(c)
{
		var astk = '*';
		var tab = '	';
		var code;

		code = 0;
		if ( c == astk ) code = 1;
		if ( c == '\n' ) code = 2; 
		if ( c == blank
				|| c == tab
				|| c == null ) code = 3;
		if ( c == '.'
				|| ( c == '+' ) 
				|| ( c == '-' )
				|| ( c == '_' )
				|| ( c >= '0' ) && ( c <= '9' )
				|| ( c >= 'a' ) && ( c <= 'z' )
				|| ( c >= 'A' ) && ( c <= 'Z' ) ) code = 4;
		return code;
} /* nexts_a */
/*****************************************/

//TODO REVIEW (was a convoluted set of GOTOs, now converted into functions.)
var nexts = function()
/*
     this picks the next continuous string of non-blank integers
     from 'line', starting at 'start'.

     if an asterisk is read, the data is assumed to continue onto
     the next line.

  input -
     line - an image of the current line being scanned.
     start - the start of the scan.

  output -
     line - an image of the current line being scanned.
     start - the start of the next non-blank string in line.
     string - a copy of the first 6 characters of the next
              non-blank string
     length - the length of the string.

     called by inperf, inname, inells, injts, inlims, parset,
     calls     llength, getout,
*/
{
   var j;
   var astk = '*';
   var tab = '	';

   length = 0;

   for (  j = 0 ; j < BMAX ; ++ j )
      string[j] = null ;
/*
     get a new line if required-
*/
   if ((start < lline) && (start > 0)) lab17() ;
	function lab10(){
	   start = 0 ;
	   if (fgets(line,BMAX,infile) == NULL)
	   {
		  console.log("\nOOPS in nexts: unexpected end of file\n");
		  console.log("missing STOP command?\n");
		   ok = 3;
		  getout(ok);
		  return;
	   }
	   ++nline ;
	   lline = llength();
	/*
		 find start of next string-
	*/
	}
	function lab17(){
   for ( j = start ; j < lline ; ++ j )
   {
      if (line[j] == astk) lab10() ;
      if (line[j] == blank) lab1() ;
      if (line[j] == tab) lab1() ;
      if (line[j] == null) lab1() ;
      if (line[j] == '.') lab3();
      if ((line[j] == '+') || (line[j] == '-')) lab3();
      if ((line[j] >= '0') && (line[j] <= '9')) lab3();
      if ((line[j] >= 'a') && (line[j] <= 'z')) lab3();
      if ((line[j] >= 'A') && (line[j] <= 'Z')) lab3();
	  if (line[j] == '_') lab3();
      lab10();
	 }
	}
	function lab1(){
/*
     rest of line empty, so look at next -
*/
   j = 0;
   lab10() ;
   }
/*
     copy up to the characters of the string,
     then move start to next blank-
*/
	function lab3(){
	   for ( start = j ; start < lline ; ++start )
	   {
		  if (line[start] == '\n') return;
		  if (line[start] == blank) return;
		  if (line[start] == tab) return;
		  if (line[start] == null) return;
		  if (line[start] == '.') lab5();
		  if ((line[start] == '+') || (line[start] == '-')) lab5();
		  if ((line[start] >= '0') && (line[start] <= '9')) lab5();
		  if ((line[start] >= 'a') && (line[start] <= 'z')) lab5();
		  if ((line[start] >= 'A') && (line[start] <= 'Z')) lab5();
		  if (line[start] == '_') lab5();
		  return;
		function lab5(){
			  string[length] = line[start] ;
			  ++length ;
		  }
	   }
	   start = -1 ;
   }
} /* nexts */
/***************************************/

//var match = function(int nnames, int lengths[EMAX], char names[EMAX][BMAX]) (returns int)
var match = function(names, lengths[EMAX], names)
/*
     find which of 'names' fits 'string'.

 input
   string - array of a1 characters to be matched.
   nnames - number of names actually stored in array names.
   names - list of possible strings for which to search.
   lengths - lengths of each of the existing names
   length - length of 'string'

     output
   which of the names that string matches, -1 if none.

     called by inperf, innames, inells, injts, inlims,
               parset, addnam,
*/
{
   var j,k ;
   var found;
   var no;
   var sp = null;

   no = -1 ;
   for (k = 0; k <= nnames; ++k)
   {
      found = TRUE;
      if ((lengths[k] == 0) || (lengths[k] == length))
      {
         for (j = 0; j < length; ++j)
         {
            if (string[j] != names[k][j]) found = FALSE;
         }
         if (found == TRUE)
         {
            no = k ;
            break;
         }
      }
   }
   return(no);
} /* match */
/***************************************/

//TODO REVIEW (GOTOs replaced with continue-s + some logic moved)
//var value = function() (returns double)
var value = function()
/*
     find the value of the number which is encoded as
     'length' characters in array 'string' and put it into 'v'.
     set ok false if string is not a number.

     called by inperf, inells, injts, parset,
*/
{
	var v; //double v;
	var nsign; //double nsign;
	var expon;	//double expon;
	var k; //int k;
	var frac; //int frac;
	var d; //int d;
	var point = '.'; //char point = '.';
	var minus = '-'; //char minus = '-';
	var plus = '+'; //char plus = '+';

	pok = TRUE;
	v = doub0;
	nsign = doub1;
	expon = doub1;
	frac = FALSE;
	if ( ( length < 0 ) || ( length > BMAX ) )
	{
		pok = FALSE;
		return( v );
	}
	for ( k = 0; k < length; ++ k )
	{
		//	if a decimal point encountered, start decimal place counter
		if (string[k] == point )
		{
			frac = TRUE;
			continue;
		}
		if ( string[k] == plus ){
			continue;
		}
		if ( string[k] == minus )
		{
			nsign = -nsign;
			continue;
		}
		for ( d = 0; d < 10; ++ d )
		{
			if ( string[k] == dig[d] ){
				v = v * doub10 + double(d);
				if ( frac == TRUE ) expon = expon / double(10);
				continue;
			}
		}
		pok = FALSE;
		return ( v );
	}
	v = v * expon * nsign;
	return( v );
} /* value */
/***************************************/

//int addnam(int n, char names[EMAX][BMAX], int isvar, int lengths[EMAX])
var addnam = function(n, names, isvar, lengths)
/*
     add a name to a list of names.
	 return the number of names in the list.

     called by inperf, inname, inells, injts, parset,
     calls     match,
*/
{
   var k; //int k;
   var no //int no ;
   var nnames //int nnames;

   nnames = n;
/*
     see if name already exists-
*/
   no = match(nnames,lengths,names);
   if (no >= 0)
   {
      console.log("addnam: string  "+string+" confusable with ");
      for (k = 0; names[no][k] != null; ++k)
         console.log(""+names[no][k]+"");
      console.log("\n");
   }
   if (isvar == FALSE)
/*
     non-variables must first check variable list-
*/
   {
      no = match(nvars,varlen,vname) ;
      if (no > 0)
      {
         console.log("name  "+string+"  confusable with variable ");
         for ( k = 0; vname[no][k] != null ; ++ k)
            console.log(""+vname[no][k]+"");
         console.log("\n");
      }
   }
   else
/*
     variables must check all name lists-
*/
   {
      no = match(nfigs,figlen,fname) ;
      if (no > 0)
      {
         console.log("variable  "+             string+"  confusable with figure ");
         for ( k = 0; fname[no][k] != null; ++ k)
            console.log(""+fname[no][k]+"");
         console.log("\n");
      }
      no = match(ne,ellen,ename) ;
      if (no > 0)
      {
         console.log("variable  "+             string+"  confusable with ellipsoid ");
         for ( k = 0; ename[no][k] != null; ++ k)
            console.log(""+ename[no][k]+"");
         console.log("\n");
      }
      no = match(njts,jntlen,jname) ;
      if (no > 0)
      {
         console.log("variable  "+             string+"  confusable with joint ");
         for ( k = 0; jname[no][k] != null; ++ k)
            console.log(""+jname[no][k]+"");
         console.log("\n");
      }
      no = match(nsubs,sublen,sname) ;
      if (no > 0)
      {
         console.log("variable  "+             string+"  confusable with subroutine ");
         for ( k = 0; sname[no][k] != null; ++ k)
            console.log(""+sname[no][k]+"");
         console.log("\n");
      }
      no = match(nfiles,fillen,tname) ;
      if (no > 0)
      {
         console.log("variable  "+             string+"  confusable with file name ");
         for ( k = 0; tname[no][k] != null; ++ k)
            console.log(""+tname[no][k]+"");
         console.log("\n");
      }
   }
/*
     add name to list-
*/
   if (nnames > EMAX)
   {
      console.log("\nOOPS addnam: "+          string+" makes more than max of "+EMAX+" names\n");
      ok = 84 ;
   }
   else
   {
      for (  k = 0 ; k < length ; ++ k )
         names[nnames][k] = string[k] ;
      for ( k = length ; k < BMAX; ++ k )
         names[nnames][k] = null;
      lengths[nnames] = length;
   }
   ++nnames ;
   return(nnames);
} /* addnam */
/***************************************/

//int getint(void)
var getint = function()
/*
     find value of positive integer which is encoded as 'length'
     characters in array 'string', and put its value into 'k'.
     set 'pok' false if string not a positive integer.

     called by parset, inname,
*/
{
	var j, k, m, ths;
	var plus = '+';

	if ( length <= 0 )
	{
		k = 0;
		pok = FALSE;
	}
	else
	{
		pok = TRUE;
		k = 0;
		for( j = 0; j < length; ++j )
		{
			if ( string[j] != plus )
			{
				ths = -1;
				for( m = 0; m < 10; ++m )
					if ( string[j] == dig[m] ) ths = m;

				if ( ths < 0 )
				{
					pok = FALSE;
					return( k );
				}
				k = 10 * k + ths;
			}
		}
	}
	return( k );
} /* getint */
/***************************************/

//int inells(void)
var inells = function()
/*
     read in next ellipsoid and its axis lengths.

     called by inperf, injts,
     calls     nexts, match, addnam, value,
*/
{
	var el, k;

	nexts();
	el = match ( ne, ellen, ename );
	if ( el < 0 )
	{
		ne = addnam ( ne, ename, 0, ellen );
		el = ne - 1;
	}
	for ( k = 0; k < 3; ++ k )
	{
		nexts ();
		semiax[k] = value ();
		if ( pok == FALSE )
		{
			console.log("\nOOPS inells: ellipsoid snag with  "+ 				string +"\n");
			ok = 83;
			return ( el );
		}
	}
	return ( el );
} /* inells */
/***************************************/

//void injts(void)
var injts = function()
/*
     read in the next joint, the ellipsoids it connects, and the
     position of the joint relative to each ellipsoid centre.

     called by inperf,
     calls     nexts, addnam, inells,
*/
{
   var el,jt,k,e ;//int
   var klet = 'k';//char
   var nlet = 'n';//char
   var elet = 'e';//char

   nexts();
   njts = addnam(njts,jname,0,jntlen);
   jt = njts-1;
   if ( ok > 0 ){
	lab4();
	return;
   }
/*
     is it a knee -
*/
   knee[jt] = FALSE;
   for (  k = 0 ; k < (length-1) ; ++ k )
   {
      if ((string[k] == klet)
       && (string[k+1] == nlet)
       && (string[k+2] == elet)) knee[jt] = TRUE;
   }
/*
  do the two ellipsoids
*/
   for (  e = 0 ; e <= 1 ; ++ e )
   {
      el = inells();
      if ( ok > 0 ){
		lab5();
		return;
	  }

      dcon[jt][e][0] = semiax[0] ;
      dcon[jt][e][1] = semiax[1] ;
      dcon[jt][e][2] = semiax[2] ;
      coel[jt][e] = el ;
   }
   return;
/*
     snags-
*/
	function lab5(){
		console.log("\nOOPS injts with "+string+" \n");
	   njts = njts-1 ;
	   return;
   }

	function lab4(){
		console.log("\nOOPS : injts more joints than max "+EMAX +"\n");
	   ok = 82 ;
   }
} /* injnts */
/***************************************/

//void inlims(void)
var inlims = function()
/*
     read in limits for a joint.

     called by main,
     calls     nexts, match, value,

*/
{
   var k,m,n;

   nexts();
   n = match(njts,jntlen,jname);
   if (n < 0)
   {
      console.log("limits given for nonexistent joint: "+          string+"\n");
      getout(1);
      if (ok == 1) return;
   }
   for (k = 0; k < 3; ++k)
   {
      for (m = 0; m < 2; ++m)
      {
         nexts();
         lim[n][k][m] = value();
      }
   }
} /* inlims */
/***************************************/

//int inname(int n, int isvar, int lengths[EMAX], char names[EMAX][BMAX])
var inname = function(n, isvar, lengths, names)
/*
     read in a number and then that many names.

     called by inperf,
     calls     nexts, getint, match, addnam,
*/
{
   var e;	//int
   var nitems;	//int
   var nnames;	//int
   var no;	//int

   nnames = n;
/*
     get number of names in list
*/
   nexts();
   nitems = getint();
   if ( ok > 0 )
   {
	   console.log("inname problem- number of names not stated on\n");
	   console.log(""+line+"\n");
	   return(nnames);
   }
/*
     get names in list
*/
   if (nitems <= 0){
	   return(nnames);
	}
   for (  e = 0 ; e < nitems ; ++ e )
   {
      nexts();
      if (length < 1){
	   return(nnames);
	}
      no = match(nnames,lengths,names);
      if (no <= 0)
         nnames = addnam(nnames,names,isvar,lengths);
   }
   return(nnames);
} /* inname */
/***************************************/

//TODO REVIEW: GOTO replaced with return and a function, which looks just as ugly as the original goto.
//void dojoin(void)
var dojoin = function()
/*
   this works out the positions of the centres of each ellipsoid
   'cen' and the joints 'jnt', using the data 'dcon'

   called by  compl,
*/
{
      //int e,ecount,newc,old,newel,oldel,j,k;
	  var e,ecount,newc,old,newel,oldel,j,k;
	  var jfound = new Array(); //int jfound[EMAX];	//ERRORAGE
      var efound = new Array() //int efound[EMAX];
      var elist = new Array() //int elist[EMAX];
/*
     clear found and put all ellipsoids at origin -
*/
      for (  e = 0 ; e < ne ; ++ e )
      {
         cen[e][0] = 0; cen[e][1] = 0; cen[e][2] = 0;
         jfound[e] = FALSE ;
         efound[e] = FALSE ;
      }
      if (njts >= 0)
      {
         ecount=0 ;
         elist[ecount]=0 ;
         efound[ecount] = TRUE;
/*
     run through the ellipsoids of current figure -
*/
	lab2();
	function lab2(){
			for (  e = ecount ; e <= ecount ;  e ++ )
			 {

	/*   run through joints, adding to figure's ellipsoids - */

				for (  j = 0 ; j <= njts ; ++ j )
				{
				   if ((jfound[j] == FALSE)
					   && ((coel[j][0] == elist[e])
						 ||(coel[j][1] == elist[e])))
				   {

	/*   found a joint- */

					  oldel = elist[e] ;
					  if (coel[j][1] == oldel) newc = 0 ;
					  if (coel[j][0] == oldel) newc = 1 ;
					  jfound[j] = TRUE ;
					  old = 1-newc ;
					  newel = coel[j][newc] ;

	/*   check for legality- */

					  for (  k = 0 ; k < ecount ; ++ k )
					  {
						 if (newel == elist[k])
						 {
							console.log("cyclic joint structure - perhaps delete doub1 of the joints \n");
							console.log(" "+                         ecount+" "+ne+" "+njts+" "+e+" "+j+" "+newc+" "+old+" "+k+" "+oldel+" "+newel+"\n");
							return;
						 }
					  }
					  ecount = ecount+1 ;
					  elist[ecount] = newel ;
					  efound[newel] = TRUE;

	/*   locate the new joint and ellipsoid- */
	   
					  for (  k = 0 ; k < 3 ; ++ k )
					  {
						  jnt[j][k] = cen[oldel][k]+dcon[j][old][k] ;
						  cen[newel][k] = jnt[j][k]-dcon[j][newc][k] ;
					  }
					}
				}
			}

	/* locate an ellipsoid in some other figure - */

			for (newel = 0; newel < ne; ++ newel)
			{
				if (efound[newel] == FALSE)
				{
				   ++ ecount;
				   elist[ecount] = newel;
				   efound[newel] = TRUE;
				   lab2();
				}
			}
		}
     }
} /* dojoin */
/*******************************************/

//void checkin(void)
var checkin = function()
/*
     check the specifications of the actions
     to be performed.

     called by  compl,
*/
{
   var newa; //int newa;
   var j; //int j;
   var subfirst; //int subfirst;

   newa = TRUE;
   subfirst = TRUE;
/*
     check for snags-
*/
   for (  j = 0 ; j <= ne ; ++ j )
   {
      if (ellfig[j] < 0)
      {
         console.log("\nOOPS checkin: ellipsoid "+       		  j+" "+ename[j]+" defined but not in a figure\n");
	     ok = 79 ;
      }
      if (ax[j][0]*ax[j][1]*ax[j][2] <= doub0)
      {
         console.log("\nOOPS checkin: ellipsoid "+ 		     j+" "+ename[j]+" not dimensioned\n");
	     ok = 80 ;
      }
   }
   if (fstop < fstart)
   {
      console.log("\nOOPS  checkin: view "+           fstart+" "+fstop +" - produces no frames\n");
      ok = 81;
   }
   for (  j = 1 ; j <= nsubs ; ++ j )
   {
      if ((ok == 0) && (called[j] == FALSE))
      {
	     if (subfirst == TRUE)
	     {
	        subfirst = FALSE;
	        newa = FALSE;
	     }
      }
   }
   if ((nvals+nvars) > EMAX)
   {
      console.log("\nOOPS  checkin "+              nvals+"  non-integer values + "+nvars+" variables\n");
      console.log(" give more than max of "+EMAX+" \n");
		ok = 82;
   }
} /* checkin */
/***************************************/

//TODO REVIEW - GOTOs replaced with return and some logic moved.
//int valadd(double v)
var valadd = function(v)
/*
     if 'v' is not in array 'val', then put it at the end.
     wherever it is, put its index into 'j'.

     called by parset,
*/
{
   var j; //int j ;

   for (  j = 1 ; j <= nvals ; ++ j )
      if (val[j] == v){
		return(j);
	  }

   nvals = nvals+1 ;
   if (nvals > EMAX){
		console.log("\nOOPS in valadd: no. of constants "+           nvals+" > max "+EMAX +"\n");
		ok = 90 ;
		return(j);
	}
   j = nvals ;
   val[j] = v ;

/*
     snag-
*/

} /* valadd */
/***************************************/

//TODO REVIEW (A tonne of GOTOs that bounce processing all over the place.) Replaced with functions, which are no prettier than the gotos.
//int parset(int contrl)
var parset = function(contrl)
/*
     decode the parameters of the jth action using:
             0  none expected
             1  numeric value or variable name
             2  ellipsoid name
             3  joint name
             4  figure name
             5  axis name
             6  subroutine name
             7  variable name
             8  anything
             9  image file name

     called by inperf,
     calls  nexts, getint, value, valadd, match, addnam,
*/
{
	int k;
	int nax = 2;
	int attach = 8;
	int detach = 9;
	double v;

	k = 0;
	if ( contrl == 0 ) return( k );
	nexts();

	//pick an integer constant-
	if ( ( contrl != 1 ) && ( contrl != 8 ) ) return( lab1() );
	k = getint();
	if ( pok == TRUE ) return( k );

	//pick a double constant-
	pok =  TRUE;
	v = value();
	if ( pok == FALSE ) return( lab1() );

	k = valadd(v);
	if ( pok == FALSE ) return( lab1() );

	k = -k;
	return( k );

	function lab1(){
		://pick an axis-
		if ( ( contrl != 5 ) && ( contrl != 8 ) ) return( lab2() );

		k = match ( nax, axlen, axnam );
		if ( k >= 0 ){
			return( k );
		}else{
			return lab2();
		}
	}

	function lab2(){
		//try for a variable-
		k = match ( nvars, varlen, vname );
		if ( k < 0 ) return( lab3() );
		usevar[k] = 1;
		if ( contrl != 7 ) k = k - EMAX + 1;
		return( k );
	}

	function lab3(){
		//pick an ellipsoid-
		if ( ( contrl != 2 ) && ( contrl != 8 ) ) return( lab4() );
		k = match ( ne, ellen, ename );
		if ( k < 0 ) return( lab4() );
		return( k );
	}

	function lab4(){
		//pick a joint-
		if ( ( contrl != 3 ) && ( contrl != 8 ) ) return( lab5() );
		k = match ( njts, jntlen, jname );
		if ( k >= 0 ) return( k );
		if ( ptype != attach ) return( lab5() );

		njts = addnam ( njts, jname, 0, jntlen );
		k = njts - 1;
		return( k );
	}

	function lab5(){
		//pick a figure-
		if ( ( contrl != 4 ) && ( contrl != 8 ) ) return( lab7() );
		k = match ( nfigs, figlen, fname );
		if ( ptype == detach ) return( lab6() );
		if ( k < 0 ) return( lab7() );
		return( k );
	}

	function lab6(){
		//action detach- accept any figure but "all"-
		if ( k == 0 ) return( lab7() );
		if ( k > 0 ) return( k );
		nfigs = addnam ( nfigs, fname, 0, figlen );
		k = nfigs - 1;
		return( k );
	}

	function lab7(){
		//pick a subroutine call-
		if ( ( contrl != 6 ) && ( contrl != 8 ) ) return( lab8() );
		k = match ( nsubs, sublen, sname );
		if ( k <= 0 )
		{
			nsubs = addnam ( nsubs, sname, 0, sublen );
			k = nsubs - 1;
		}
		called[k] = TRUE;
		return( k );
	}

	function lab8(){
		//pick a file name-
		if ( ( contrl != 9 ) && ( contrl != 8 ) ) return( lab9() );
		k = match ( nfiles, fillen, tname );
		if ( k > 0 ) return( k );
		nfiles = addnam ( nfiles, tname, 0, fillen );
		k = nfiles - 1;
		return( k );
	}

	function lab9(){
		//snag-
		printf ( "\nOOPS parset : contrl %d\n", contrl );
		bell ( 1, 1 );
		ok = 89;

		//lab11:
		return( k );
	}
} /* parset */
/***************************************/

//void inperf(void)
var inperf = function()
/*
     this decodes the input text defining the required actions.

  global  variables
     main     -true if in main program.
     nmax     -max number of commands possible.
     ptype    -type of action being read.

     called by compl,
     calls     nexts, match, addnam, inname, inells, injts,
               value, parset, nlims,

	30 Jul 2006 d072 put infinite loop if error
*/
{
	var nells;	//int
	var how;	//int     // type number of current action keyname.
	var j;	//int
	var k;	//int
	var linel;	//int   // length of string 'line'
	var nmax;	//int	  // max number of commands possible
	var s;	//int	     // counter thru subs and along a string
	var thisub;	//int // number of current subroutine
	var v;	//double

	p = 0;
	thisub = 0;
	subact[0][0] = 0;
	nmax = 4 * EMAX + PMAX;

	// run through statements

	for ( comand = 1; ( ( ok == 0 ) && ( comand <= nmax ) ); ++comand )
	{
		start = -1;
		nexts ();
		linel = (int)strlen ( line );
		for ( s = 0; s < linel; ++s )
			aline[comand][s] = line[s];
		how = match ( NKEYS, keylen, keynam );
		ptype = how;
		if ( ( how <= 0 ) || ( how >= NKEYS ) )
		{
			console.log("\nOOPS inperf: how "+ how+" outside range 0 to "+ NKEYS +"\n");
			bell ( 1, 1 );
			ok = 88;
		}
		else if ( how == stop_keyword_code )
		{
			subact[thisub][1] = p - 1;
			break;
		}
		else if ( how == figure_keyword_code  )
		{
			nexts ();
			nfigs = addnam ( nfigs, fname, FALSE, figlen );
			nells = ne;
			figell[nfigs-1] = ne;
			ne = inname ( nells, 0, ellen, ename );
		}
		else if ( how == ellips_keyword_code  )
		{
			j = inells ();
			ax[j][0] = semiax[0];
			ax[j][1] = semiax[1];
			ax[j][2] = semiax[2];
		}
		else if ( how == joint_keyword_code )
		{
			injts ();
		}
		else if ( how  == limits_keyword_code )
		{
			inlims ();
		}
		else if ( how == variable_keyword_code )
		{
			nvars = inname ( nvars, 1, varlen, vname );
			if ( ( nvars + nvals ) > EMAX )
			{
				console.log("\nOOPS inperf nvars "+ nvars+" + nvals "+ nvals+" > EMAX "+ EMAX +"\n");
				bell ( 1, 1 );
				ok = 87;
			}
		}
		else if ( how == speed_keyword_code )
		{
			nexts ();
			v = value ();
			if ( v < doub0 ) slow = int ( -v + inv2 );
			if ( v > doub0 ) fast = int ( v + inv2 );
		}
		else if ( how == view_keyword_code )
		{
			nexts ();
			v = value ();
			if ( pok == TRUE )
			{
				vstart = int ( v ) - 1;
				if ( vstart < 0 ) vstart = 0;
				nexts ();
				v = value ();
				if ( pok == TRUE ) vstop = int ( v );
			}
			if ( pok == FALSE )
			{
				console.log("\nOOPS inperf: view "+ v +"\n");
				bell ( 1, 1 );
				ok = 70;
			}
		}
		else if ( how == subrou_keyword_code  ) // start a subroutine
		{
			inmain = FALSE;
			if ( thisub == 0 ) subact[0][1] = p - 1;
			nexts ();
			thisub = match ( nsubs, sublen, sname );
			if ( thisub <= 0 )
			{
				nsubs = addnam ( nsubs, sname, 0, sublen );
				if ( ok == 0 ) thisub = nsubs - 1;
			}
			defined[thisub] = TRUE;
			subact[thisub][0] = p;
		}
		else if ( how == endsub_keyword_code )  //  end of a subroutine
		{
			nexts ();
			k = match ( nsubs, sublen, sname );
			if ( k == thisub )
			{
				subact[k][1] = p - 1;
			}
			else
			{
				console.log("\nOOPS inperf: k "+ k+" != thisub "+ thisub +"\n");
				bell ( 1, 1 );
				ok = 86;
			}
		}
		else if ( p >= PMAX )//  read an action -
		{
			p = PMAX - 1;
			console.log("beware- more than "+ PMAX +" action specs\n");
			console.log("actions deleted after line  "+ nline+"\n"+ line +"\n");
		}
		else
		{
			distrn[p] = how;
			cline[p] = comand;

			// read frames to which this action refers -

			frstart[p] = parset(1);
			if ( ok == TRUE ) frstop[p] = parset ( 1 );
			if ( inmain == TRUE )
			{
				if ( frstart[p] < fstart )
					fstart = frstart[p];
				if ( frstop[p] > fstop )
					fstop = frstop[p];
			}
			if ( ok == TRUE ) //call of a subroutine
			{
				if ( how == call_keyword_code )
				{
					distrn[p] = call_keyword_code;
					ptype = call_keyword_code;
					type[p] = call_keyword_code;
					nexts ();
					k = match ( nvars, varlen, vname );
					if ( k < 0 )
					{
						k = match ( nsubs, sublen, sname );
						if ( k < 0 )
						{
							nsubs = addnam ( nsubs, sname, 0, sublen );
							k = nsubs - 1;
						}
						called[k] = TRUE;
						pf[p][0] = k;
					}
					else
					{
						pf[p][0] = k - EMAX + 1;
					}
				}
				else // read action done in these frames
				{
					nexts ();
					ptype = match ( NKEYS, keylen, keynam );
					type[p] = ptype;
					if ( ( ptype < 1 ) || ( ptype >= NKEYS ) )
					{
						console.log("\nOOPS inperf: ptype "+ ptype +"\n");
						bell ( 1, 1 );
						ok = 85;
					}
					else // run through parameters of pth action
					{
						for ( j = 0; ( ( ok <= 0 ) && ( j < 6 ) ); ++j )
						{
							pf[p][j] = parset ( par[ptype][j] );
							if ( ok > 0 )
							{
								console.log("\nOOPS in inperf: problem parameter "+ j+" "+ p+" "+ pf[p][j]+" "+ ptype+" "+ par[ptype][j] +"\n");
								bell ( 1, 1 );
							}
						}
					}
				}
			}
		}
		if ( ok > 0 )
		{
			console.log("\nOOPS in inperf: problem near line "+	nline+"\n "+ line +"\n\n");
			bell ( 1, 1 );
			while(true){}//dead: goto dead; WTF?! TODO REVIEW
		}
		if ( distrn[p] > 0 ) ++p;
		npfs = p;
	}
} /* inperf */
/***************************************/

//void compl()
var compl = function()
/*
   calls    inperf, getout, dojoin, checkin,
   called by main,
*/
{ 
   nline = 0;
   inperf();
   if (ok > 0) getout(1);
   if (ok == 1) return;
   dojoin();
   if (ok > 0) getout(1);
   if (ok == 1) return;
   checkin();
   if (ok > 1) getout(1);
} /* compl */
/***************************************/
/*
          actions39.h

      setels      - finds ellipsoids and joints connected to given ellipsoid
      save        - store positions and orientations
      restore     - restore positions and orientations
      store3      - writes data about given frame to arrays
      getvalu     - gets a value from constants or variables
      vecmat      - multiplies a vector by a matrix
      doground    - moves a set of ellipsoids to rest on y = 0
      setjnt      - finds ellipsoids and joints connected to a given joint
      setfrc      - sets proportion of action for current frame
      doscale     - scale a value by some proportion
      findfg      - finds which figure includes a given ellipsoid
      checkpr     - checks parameters for legality
      setper      - decodes the parameters of the current action
      sqr         - square a value
      docolour    - sets colours of an ellipsoid
      doplace     - sets viewing point (array 'pplace')
      setobs      - sets 3*3 matrix for viewing rotation and place
      enquir      - stores values of centres, joints or axis lengths
      doattach    - joins 2 figures into 1
      dodetach    - breaks 1 figure into 2
      domoveby    - moves a set of ellipsoids relative to refell
      dogroell    - scales axes of an ellipsoid
      dogrofig    - scales a set of ellipsoids in size
      dogrojnt    - scales set of ellipsoids keeping a joint fixed
      domovjnt    - moves a joint
      balanc      - balances part of a figure
      dodrag      - keeps an ellipsoid touching ground
      dcen        - find separation of ellipsoid centres
      newton      - solve a polynomial
      getmat      - generate matrix of an ellipsoid
      getaxes     - find axis lengths of an ellipsoid
      surf        - find separation of ellipsoid surfaces
      sepn        - find distance between 2 ellipsoid surfaces
      fun         - used by 'solve' for abut
      solve       - find zero of 'fun'
      angsepn     - find approx angular separation of ell1 and ell2 from x
      dotouch     - bends a figure to make 2 ellipsoids touch
      trying      - 'domoveby' then 'sepn'
      fndmin      - find minimum of function 'trying'.
      doabut      - slide figure to touch another


***************************************/

//TODO REVIEW: Yet another function full of GOTOs that has to be reviewed. Replaced with return-s, continue-s, a big if-statement and a function.
//void setels(int ellpsd, int jthis)
var setels = function(ellpsd, jthis)
/*
     puts into 'elist' and 'jlist' those ellipsoids and joints
     (if any) connected to 'ellpsd'
     (including 'ellpsd' and 'jthis')
     except those connected through joint 'jthis'

     if 'jthis' is negative, puts all joints and ellipsoids
     connected to 'ellpsd' into lists.
     if 'ellpsd' is zero, puts all joints and ellipsoids into lists,
     except ellipsoid zero (world).

     'ecount' is the number of ellipsoids in the list 'elist'.
     'jcount' is the number of joints in the list 'jlist'.

     called by  setper, findfg, dodetach, dogrojnt, dodrag,
                store3, fun,
*/
{
      var change;	//int
      var ell;	//int
      var e,ee,j,jj ;	//int


      if (ellpsd >= ne)
      {
          ok = 79;
          console.log("\nOOPS setels: ellpsd "+ 			  ellpsd+" "+ename[ellpsd]+" >= ne "+ne+"\n");
          return;
      }
      if (ellpsd <= 0){
		lab6();
		return;
	  }
      ecount = 1;
      elist[0] = ellpsd;
      if (njts <= 0) return;
      jcount = 0;
      if (!(jthis < 0)){
		  if (jthis >= njts)
		  {
			  ok = 78;
			  console.log("\nOOPS setels: jthis "+ 			  jthis+"  "+jname[jthis]+" > njts "+njts+"\n");
			  return;
		  }
		  if ((coel[jthis][0] != ellpsd) && (coel[jthis][1] != ellpsd))
		  {
			  ok = 50;
			  console.log("\nOOPS setels: joint "+jthis+" "+name[jthis]+" connected to "+coel[jthis][0]+" "+ename[coel[jthis][0]]+" and "+coel[jthis][1]+" "+ename[coel[jthis][1]]+", not "+ellpsd+" "+ename[ellpsd]+"\n");
			  return;
		  }
		  jcount = 1;
		  jlist[0] = jthis;
	}
	  change == TRUE;
	  while(change == TRUE){
			change = FALSE;
		  for ( e=0; e < ecount; ++e )
		  {
	/*   seek joint not in jlist connected to ellipsoid elist[e]- */

			 for ( j=0; j < njts; ++j )
			 {
				if ((j == jthis) && (jthis > 0)) continue;
				boolean b = false;
				for (  jj=0; jj < jcount; ++jj ){
				   if (j == jlist[jj]){
					b = true;
				   }
				}
				if(b == true){
					continue;
				}
	/*   
		j not in list yet-
	*/
				ell = -1;
				if (coel[j][0] == elist[e]) ell = coel[j][1];
				if (coel[j][1] == elist[e]) ell = coel[j][0];
				if (ell < 0) continue;

	/*   store new joint and ellipsoid- */

				jlist[jcount] = j;
				++jcount;
				change = TRUE;
				for (  ee=0; ee < ecount; ++ee )
				   if (ell == elist[ee]) continue;
				elist[ecount] = ell;
				++ecount;
				change = TRUE;
			 } /* j */
		 } /* e */
	 }
	 return;

/*   set all ellipsoids and joints- */

	lab6();
	function lab6(){
		jcount = 0 ;

	/*   all joints with non-null connections- */

		  jcount = 0;
		  for (  j = 0 ; j <= njts ; ++ j )
		  {
			 if (coel[j][0] >= 0)
			 {
				++jcount;
				jlist[jcount-1] = j ;
			 }
		  }

	/*   all ellipsoids except world- */

		  ecount = ne ;
		  for (  e = 1 ; e <= ne ; ++ e )
			 elist[e-1] = e ;
	}
}  /* setels */
/*************************************************/

/*****************************************************/
/*
         shado41.h

     based on shadoq.c

     to add shadows to figures

     26 Apr  2005  adapt to include in drawel
     16 Jan  2003  remove the shadows below ground
     15 Aug  2001  move the shadows below ground
     18 Aug  1993  to accommodate joints
     23 Oct  1992  D.Herbison-Evans  written

***************************************************

   subroutines-
        setcof
        setaxe
        setpro
        setmat
        setnup
        ground
        doshadow

***********************************************/

//void setcof(double coef[7], double el[3][3] )
voar setcof = function(coef, el )
/* 
     set up coeffs of outline ellipse of an ellipsoid about 
     its own centre in the form -  
   
     coef(1)*x**2 + coef[2]*z**2 + coef[3]*x*z 
         + coef(4)*x + coef[5]*z + coef[6] = 0 
   
     called by setnup,
*/
{
   var den ;//double

   if (el[1][1] == doub0){
		console.log("setcof "+               el[1][0]+" "+el[1][1]+" "+el[1][2]+"\n");
		ok = 99 ;
		return;
   }
   den = doub1/el[1][1] ;
   coef[1] = el[0][0] - el[0][1]*el[0][1]*den ;
   coef[2] = el[2][2] - el[1][2]*el[1][2]*den ;
   coef[3] = doub2*(el[0][2] - el[0][1]*el[1][2]*den) ;
   coef[4] = doub0 ;
   coef[5] = doub0 ;
   coef[6] =  -doub1 ;
   return;
/* 
     snags -  
*/
} /* setcof */
/************************************************/

//void setaxe(int n, double axe[3], double coef[7])
var setaxe = function(n, axe, coef)
/* 
     find semiminor axis, axe[0], and semimajor 
     axis, axe[2], of ellipse described by coef. 
   
     called by setnup, 
*/
{
   var discrt,lamx,lamz,c12,rtdis ;//double 

   lamx = doub1 ;
   lamz = doub1 ;
   discrt = (coef[1] - coef[2])*(coef[1] - coef[2])+ coef[3]*coef[3];
   if (discrt < doub0){
		lab1();
		return;
   };
   c12 = inv2*(coef[1]+coef[2]) ;
   rtdis = inv2*sqrt(discrt) ;
   lamx = c12 + rtdis ;
   lamz = c12 - rtdis ;
   if (lamx <= doub0){
		lab1();
		return;
   };
   if (lamz <= doub0){
		lab1();
		return;
   };
   axe[0] = doub1/sqrt(lamx) ;
   axe[2] = doub1/sqrt(lamz) ;
   return;
/* 
     snags -  
*/
	function lab1(){
		console.log("setaxe snag "+          lamx+" "+lamz+" "+discrt+"\n");
	   ok = 98 ;
   }
} /* setaxe */
/******************************************/

//double setpro(double coef[7])
var setpro = function(coef)
/*
     for the outline of nth ellipsoid, find 'phi'
     angle between axx axis and scene x axis.
   
     called by setnup, 
*/
{
   var phi ;//double 

   phi = pi-inv2*atan2(coef[3], coef[1]-coef[2]) ;
   if (phi < doub0) phi = phi+twopi ;
   return(phi);
} /* setpro */
/******************************************/

//void setmat ( int n, double el[3][3], double el1[3][3], double unel1[3][3] )
var setmat = function( n, e1, el1, unel1 )
/*

	finds the matrix "el" of the quadratic form of the "n"th
	ellipsoid by taking the diagonal matrix of inverse square
	semiaxes, and doing on it a similarity transform
	for its own rotation.

	called by setnup, cutting,
	calls matmul, rotget,

	12 Aug 2006  returning el1 and unel1
*/
{
	var ii, j;//int
	//double el0[3][3],el2[3][3],el3[3][3];
	//double r[3][3], unr[3][3];
	var e10 = get2DArray(3);
	var e12 = get2DArray(3);
	var e13 = get2DArray(3);
	var r = get2DArray(3);
	var unr = get2DArray(3);

	// initialise diagonal matrix -

	for ( ii = 0; ii < 3; ++ ii )
	{
		for ( j = 0; j < 3; ++ j )
		{
			el0[ii][j] = doub0;
			el3[ii][j] = doub0;
		}
		if ( ax[n][ii] ==  doub0 )
		{
			console.log("setmat  ax["+ n+"]["+ ii +"] = 0\n");
			ok = 97;
			return;
		}
		el0[ii][ii] = doub1 / ax[n][ii];
		el3[ii][ii] = ax[n][ii];
	}
	rotget ( r, unr, n );

	// do similarity transform -

	matmul ( el0, unr, el1 );
	matmul ( r, el0, el2 );
	matmul ( el2, el1, el);
	matmul ( r, el3, unel1);
} /* setmat */
/**********************************************/

//double setnup(int n, double axe[3])
var setnup = function(n, axe)
/* 
     set up parameters of nth ellipsoid relative 
     to own centre. 
   
     called by shadow, 
     calls     setmat, setcof, setaxe, setpro, 
*/
{
   //double el[3][3],el0[3][3],el1[3][3];
   //double con[7];
   var phi;//double
   var e1 = get2DArray(3);
   var e10 = get2DArray(3);
   var e11 = get2DArray(3);
   var con = new Array();

   phi = doub0;
   setmat(n,el,el0,el1) ;
   if ( ok > 0 ){
		lab1();
		return(phi);
	}
   setcof(con,el) ;
   if ( ok > 0 ){
		lab1();
		return(phi);
	}
   setaxe(n,axe,con) ;
   if ( ok > 0 ){
		lab1();
		return(phi);
	}
   phi = setpro(con) ;
   if ( ok > 0 ){
		lab1();
		return(phi);
	}
	return(phi);
/* 
     snag -  
*/
	function lab1(){
		ok = 96;
		console.log("setnup snag in ellipsoid "+n +"\n");
	}
   return(phi);
} /* setnup */
/******************************************/

//double elground(int i)
var elground = function(i)
/*
   find distance of lowest point above the ground
   of the ellipsoid 'i'.

   called by  shadow,
   calls      rotget,
*/
{
   var x,y,z;//double
   var val;//double
   var sumsq;//double
   var sqt;//double
   //double r[3][3],unr[3][3] ;
   var r = get2DArray(3);
   var unr = get2DArray(3);

   val = cen[i][1];

/*   find lowest point- */

   rotget(r,unr,i) ;
   x = unr[0][1]*ax[i][0] ;
   y = unr[1][1]*ax[i][1] ;
   z = unr[2][1]*ax[i][2] ;
   sumsq = x*x+y*y+z*z;
   if (sumsq > doub0)
      sqt = sqrt(sumsq); else sqt = doub0;
   val = cen[i][1] - sqt ;
   return(val);
}  /* elground */
/**********************************************************/

//void doshadow()
var doshadow = function()
/* 
  find the shadow ellipsoids of each ellsoid in the scene

     called by store3,
     calls     setnup, rset, rotput, ground,
*/
{
   var k,n;//int
   var y, phi;//double
   //double r[3][3];
   var r = get2DArray(3);
   //double axe[3];
   var axe = Array();
/* 
     run thru ellipsoids to shadow each in turn -  
*/
    k = ne;
    for (  n = 1 ; n < ne ; ++n )
    {
         phi = setnup(n,axe);
         y = elground(n);
         if (y > doub0)
         {
            cen[k][0] = cen[n][0];
            cen[k][1] = -inv5;
            cen[k][2] = cen[n][2];
            ax[k][0] = axe[0];
            ax[k][1] = inv5;
            ax[k][2] = axe[2];
            rset(r,phi,1);
            rotput(r,k);
            col[k][0] = doub1;
            col[k][1] = doub1;
            col[k][2] = doub1;
			++k;
         } /* y > 0 */
    } /* end n loop */
    ne = k;
} /* doshadow */
/******************************************/

//void save(void)
var save()
/*
   save positions and orientations

   called by  store3, doabut, dodrag, dotouch,
*/
{
   var j,n;//int

   nesave = ne;
   for (n = 0; n <= ne; ++n)
   {
      for ( j = 0; j < 3; ++j)
      {
         censav[n][j] = cen[n][j];
         jntsav[n][j] = jnt[n][j];
      }
      for ( j = 0; j < 5; ++j)
         quasav[n][j] = quat[n][j];
   }
} /* save */
/***********************************************/

//void restore(void)
var restore()
/*
   restore positions and orientations

   called by  store3, doabut, try, dodrag, fun, dotouch,
*/
{
   var j,n;//int

   ne = nesave;
   for (n = 0; n <= ne; ++n)
   {
      for (j = 0; j < 3; ++j)
      {
         cen[n][j] = censav[n][j];
         jnt[n][j] = jntsav[n][j];
      }
      for ( j = 0; j < 5; ++j)
         quat[n][j] = quasav[n][j];
   }
} /* restore */
/***********************************************/

//void store3(int f)
var store3 = function(f)
/*
    store axes, centres, orientations and colours
    of  nels ellipsoids starting at 1 (avoiding  0 = world),

    called by doframes,
    calls     save, doshadow, setels, shift, twirl, rotput,
	          mkang, storeang, mkquat, rotgrt, restore,
*/
{
   var e,j;//int
   //double invobs[3][3];
   invobs = get2DArray(3);

   save();
   if (shadow == TRUE) doshadow();
   setels(0,-1);
   twirl(pplace[0],pplace[1],pplace[2],obs);
   shift(-pplace[0],-pplace[1],-pplace[2]);
   nels[f] = ne;
   for (e = 0; e < ne; ++e)
   {
      for (j = 0; j < 3; ++j)
      {
         qu3[f][e][j+1] = quat[e][j];
         ax3[f][e][j] = ax[e][j]*inv1000;
         ce3[f][e][j] = cen[e][j]*inv1000;
         co3[f][e][j] = col[e][j]*inv256;
      } /* j*/
      qu3[f][e][3] = -qu3[f][e][3];
      qu3[f][e][0] = degree*atan2(quat[e][3], quat[e][4]);
      ce3[f][e][2] = doub1 - ce3[f][e][2];
      if (col[e][0] < 0)
            sprintf(tn3[f][e],"%s",tname[int(inv2-col[e][0])]);
   } /* e */
   rotput(obs,ne);
   mkang(ne);
   storeang(f,ne,ang[0],ang[1],ang[2]);
   mkquat(ne,ang[0],ang[1],ang[2]);
   rotget(obs,invobs,ne);
   restore();
}  /* store3 */
/***********************************************/

//int getvalu(int p)
var getvalu = function(p)
/*
  get value possibly from array val and put it into v and k.
  if p is negative, get value of variable val(abs(p)),
  if p is positive get p directly.

  called by  doperfrm, setper,
*/
{
   var k;//int
   var ref ;//int

   ref = 0 ;
/*
  is the parameter a variable or direct reference
*/
   if (p < 0)
   {
/*
  parameter is index into array val-
*/
      ref = -p ;
      if ((ref < 0) || (ref >= EMAX))
      {
         ok = 15 ;
         console.log("val index "+ 		     ref+" outside range 0 - "+EMAX+"\n");
      }
      else
      {
         v = val[ref] ;
         k = int(v + inv2) ;
         if (v < doub0) k = int(v -inv2) ;
      }
   }
   else
/*
  parameter is direct reference, use it-
*/
   {
      k = p ;
      v = k ;
   }
   return(k);
}  /* getvalu */
/**************************************/

//void vecmat(double v[3], double m[3][3], double w[3])
var vecmat = function(v, m, w)
/*
   multiply vector 'v' by matrix 'm',
   putting result in 'w'.

   called by  sepn, dobalanc,
*/
{
      var i,j;//int
      //double vv[3]
	  var vv = Arrray();
	  var x;//double

      for (  i = 0 ; i < 3 ; ++ i )
      {
         x = doub0 ;
         for (  j = 0 ; j < 3 ; ++ j )
         {
            x = x+m[i][j]*v[j];
         }
         vv[i] = x ;
      }
      for (  i = 0 ; i < 3 ; ++ i )
      {
         w[i] = vv[i];
      }
}  /* vecmat */
/**********************************************************/

//double elow(int i)
var elow = function(i)
/*
   find height of lowest point of ellipsoid i
   
   called by doground,
   call rotget,
  */
{
   //double r[3][3],unr[3][3];
   var r = get2DArray(3);
   var unr = get2DArray(3);
   var x,y,z;	//double
   var sq,sqt;	//double
   var toty;	//double

   rotget(r,unr,i);
   x = unr[0][1]*ax[i][0];
   y = unr[1][1]*ax[i][1];
   z = unr[2][1]*ax[i][2];
   sq = x*x+y*y+z*z;
   if (sq > doub0) 
      sqt = sqrt(sq); 
   else 
      sqt = doub0;
   toty = cen[i][1] - sqt;
   return(toty);
} /* elow */
/******************************************************/

//double doground(void)
var doground = function()
/*
   find distance of lowest point above the ground
   of the ellipsoids contained in 'elist'.

   called by  action, dodrag, fun, doshadow,
   calls      rotget,
*/
{
   var n ;//int
   var toty;//double
   var val;//double

   if ((ecount < 1) || (ecount > ne))
   {
      ok = 38 ;
      console.log("\nOOPS doground: ecount "+                         ecount+" out of range\n");
   }
   else
   {
      val = cen[elist[0]][1];
/*  run through affected ellipsoids finding lowest point- */
      for (  n = 0 ; n < ecount ; ++ n )
      {
         toty = elow(elist[n]);
         if (toty < val) val = toty;
      } /* n */
   } /* if ecount */
   return(val);
}  /* doground */
/**********************************************************/

//void setjnt(int ellpsd, int jthis)
var setjnt = function(ellpsd, jthis)
/*
     puts into 'elist' and 'jlist' those ellipsoids and joints
     (if any) connected to 'ellpsd'
     (including 'ellpsd' and excluding 'jthis')
     except those connected through joint 'jthis'

     'ecount' is the number of ellipsoids in the list elist.
     'jcount' is the number of joints in the list jlist.

     called by  domovjnt,
*/
{
      var done;//int
      var e,j,i,jt ;//int

      ecount = 1 ;
      elist[0] = ellpsd ;
      jcount = 0 ;
      if ((coel[jthis][0] != ellpsd) && (coel[jthis][1] != ellpsd))
      {
          ok = 64;
          console.log("\nOOPS setjnts: coel "+coel[jthis][0]+"  "+coel[jthis][1]+" out of range "+ellpsd+" "+jthis+"\n");
          return;
      }

	done = FALSE;
	while((done == FALSE))
	{

		for (  e = 0 ; e < ecount ; ++ e )
		{
			done = TRUE;

	/*   seek joint not in jlist but connected to ellipsoid elist[e]- */
		
			for (  jt = 0 ; jt < njts ; ++ jt )
			{
				if (jt == jthis) continue;
				if (jcount > 0)
				{
					for (  j = 0 ; j < jcount ; ++ j )
					{
						if (jt == jlist[j]) continue;
					}
				}
	/*
	   jt not in list yet-
	*/
				i =  -1 ;
				if (coel[jt][0] == elist[e]) i = 1 ;
				if (coel[jt][1] == elist[e]) i = 0 ;
				if (i < 0) continue;

	/*   store new joint and ellipsoid- */

				jlist[jcount] = jt ;
				jcount ++;
				elist[ecount] = coel[jt][i] ;
				ecount ++;
				done = FALSE;
			}
        }
    }
}  /* setjnt */
/*************************************************/

//END PORT ON 2013-12-10 (Errorage)























































