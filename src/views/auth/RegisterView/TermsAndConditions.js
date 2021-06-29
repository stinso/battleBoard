import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography
} from '@material-ui/core';

export default function TermsAndConditions() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <Box alignItems="center" display="flex">
        <Typography variant="body2" color="textSecondary">
          I have read the&nbsp;
        </Typography>
        <Link
          component="a"
          variant="body2"
          color="secondary"
          onClick={handleClickOpen('paper')}
          href="#"
          hover="none"
        >
          Terms and Conditions
        </Link>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Terms and conditions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography component="span" variant="body1" color="textSecondary">
              Last Updated August 2020
              <br />
              <br />
              The Terms and Conditions (the “T&C” or “Terms”) apply to the buyer
              of the CHAIN Utility Token (hereinafter “CHAIN UTILITY TOKEN”) and
              future user of the Chain Games platform and constitute an
              agreement between Chain Games and you. Please read these terms
              carefully before moving onto the token pre-sale and sale. The T&C
              affect your obligations and legal rights, including, but not
              limited to, waiver of rights and limitation of liability. If you
              do not agree to these terms of sale, do not participate in the
              sale of the Tokens.
              <br />
              <br />
              By purchasing the CHAIN UTILITY TOKENS during the token pre-sale
              and crowd-sale period (hereinafter the “Token Sale”), in the
              jurisdiction of Estonia, you will be bound by this T&C, and all
              terms incorporated by reference. Your purchase of CHAIN UTILITY
              TOKEN is subject to this T&C. You may not use our website,
              services, platforms, and acquire CHAIN UTILITY TOKENS, if you are
              under 18 years old, and if you are a citizen, resident, habitant
              or legal entity incorporated in Restricted Use Areas as described
              below. I. Applicability
              <br />
              <br />
              The following T&C constitute the agreement (the “Agreement”)
              between CHAIN GAMES (hereinafter “Chain Games” or the “Company” or
              “us” ), an Estonian Private Limited Liability Company with
              registration number 16029997, and YOU (hereinafter “User” or
              “you”), with respect to the purchase of the CHAIN UTILITY TOKEN
              and the future use of the services offered through the Chain Games
              platform (hereinafter “Platform”).
              <br />
              <br />
              By using our services, you are agreeing to be bound by the T&C in
              its latest version. You are aware that Chain Games may change this
              T&C at any time, on our sole discretion without any prior notice
              to you. Any changes will be effective immediately upon posting on
              our Website. Your continued use of the Chain Games Platform means
              that you accept any new or modified terms.
              <br />
              <br />
              Chain Games OÜ Harju maakond, Tallinn, Lasnamäe linnaosa, Lõõtsa
              tn 5, 11415 www.chaingames.io
              <br />
              <br />
              II. Services
              <br />
              <br />
              1. Chain Games is aiming to create a cryptocurrency, called CHAIN
              Utility Token, to be used on its decentralized blockchain gaming
              platform for wagering on peer to peer games of skill.
              <br />
              <br />
              2. Based on the Ethereum platform, CHAIN cryptocurrency will be
              issued as an entry payment on services provided on the platform,
              and a rewarding program for the community.
              <br />
              <br />
              3. Verified KYC enables clients to participate/contribute in the
              CHAIN Token Sale.
              <br />
              <br />
              4. Chain Games does not have the legal qualification as a
              security, since it does not give any rights on dividends or
              interest, any ownership right or stake share or equivalent rights
              or any right to receive future revenue shares, or any other form
              of participation in or relating to the Company, nor shall CHAIN
              holders have any influence or rights in the development or
              governance of the Company. CHAIN, therefore, is not a share and
              does not give any right to participate in the general meetings of
              the Company. The CHAIN Utility Token is final and non-refundable.
              The acquirement and use of CHAIN Utility Token shall not be done
              for speculative usage.
              <br />
              <br />
              5. CHAIN Utility Token can be purchased during the Token Pre-Sale
              and Sale directly from the Company or after the Token Sale at the
              Company through the Sale on https://www.uniswap.org, a fully
              decentralized protocol for automated liquidity provision on
              Ethereum, or as per Company future recommendations.
              <br />
              <br />
              6. Company gives no warranties that CHAIN Utility Tokens will be
              exchangeable on specific platforms or that they shall remain
              exchangeable on exchange platforms or that they would be
              exchangeable on other exchanges.
              <br />
              <br />
              7. CHAIN Utility Token is not an investment advice, a security nor
              an investment product and any action, notice, communication,
              message, decision, managerial act, or omission of the mentioned
              shall not be understood and interpreted as such. Company gives no
              guarantees as to the value of any of the CHAIN Utility Tokens and
              explicitly warns users that there is no reason to believe that
              CHAIN Utility Token will increase in value, and they might also
              decrease in value or lose their value entirely. You represent and
              warrant, that you are acquiring CHAIN Utility Tokens for your own
              personal use and for your personal utility and not for investment
              or financial purposes. You also represent and warrant that you do
              not consider Chain Games as a security and you understand that
              CHAIN Utility Tokens may lose all their value and that you are not
              purchasing CHAIN Utility Tokens as an investment and that you are
              aware of all other risks deriving from holding CHAIN Utility Token
              as specified in these Terms and you accept them.
              <br />
              <br />
              8. Chain Games performs as an entry ticket and is required to
              qualify for to avoid risks related to volatility (edging) Company
              may manage the funds received through CHAIN Utility Token
              distribution, by trying to minimize and/or avoid risks related to
              volatility using its best efforts, based on the Company’s sole
              discretion. You expressly agree to any measure Company may apply
              trying to avoid and/or minimize risks related to volatility.
              <br />
              <br />
              9. CHAIN Utility Tokens are unregulated. Chain Games is not a
              financial institution and is currently not under supervision of
              any financial supervisory authority. Chain Games does not provide
              any licensed financial services, such as investment services, fund
              management or investment advice. None of the information or
              analysis presented herein are intended to form the basis for any
              investment decision, no specific recommendations are intended, and
              Chain Games, website and CHAIN Utility Tokens do not offer, are
              not and shall not be construed as investment or financial
              products. In the event of any regulatory changes would impact
              CHAIN, Chain Games reserves the right to amend its Services, the
              Website and the CHAIN Token.
              <br />
              <br />
              III. Token Distribution
              <br />
              <br />
              1. Token distribution is not a public offering of equity or debt
              and consequently does not fall under the securities or any
              prospectus regulation. You can make a contribution into a smart
              contract system in Ethereum or ERC-20 tokens (Digital Assets built
              on Ethereum) and receive CHAIN in exchange.
              <br />
              <br />
              2. Company reserves the right to amend acceptable digital assets
              at any time, based on its sole discretion. All acquirement of
              CHAIN Utility Tokens shall be publicly accessible through the
              Ethereum blockchain.
              <br />
              <br />
              IV. Knowledge Required
              <br />
              <br />
              1. The User purchasing CHAIN Utility Tokens expressly acknowledges
              and represents that she/he has carefully reviewed the T&C and
              fully understands the risks, costs and benefits associated with
              the acquisition of this token as indicated in the T&C.
              <br />
              <br />
              2. The User undertaking to acquire CHAIN Utility Token in relation
              to the token sale should ensure that she/he understands and has
              significant experience of cryptocurrencies, blockchain systems and
              services, and that she/he fully understands the risks associated
              with the Token Sale as well as the mechanism related to the use
              and custody of cryptocurrencies.
              <br />
              <br />
              3. Chain Games shall not be responsible for any loss of CHAIN
              Utility Tokens or situations making it impossible to access the
              CHAIN Utility Token, which may result in any actions or omissions
              of the future User or any person undertaking to acquire CHAIN
              Utility Tokens.
              <br />
              <br />
              4. Chain Games is not a provider of (a) exchange services between
              virtual currency and fiat currency; (b) wallet or custodial
              services of credentials necessary to access virtual currencies or
              (c) cryptocurrency mining services. User expressly agrees and
              acknowledges that anytime throughout the duration of these Terms,
              CHAIN Utility Tokens may require material, technical, commercial
              or any other changes and understands that an upgrade or
              modification of the CHAIN Utility Tokens may be required. If a
              user decides not to participate in such upgrade, the user
              acknowledges and agrees that non-upgraded CHAIN Utility Tokens may
              lose their functionality in full and that they may no longer use
              the CHAIN Utility Token.
              <br />
              <br />
              V. Risks
              <br />
              <br />
              1. Development failure or abortion. Acquiring and storing CHAIN
              Utility Tokens involves various risks, in particular that Chain
              Games may not be able to launch some operations and continue
              developing its platform or community. Therefore, and prior to
              acquiring CHAIN, any user should carefully consider the risks,
              costs, and benefits of acquiring CHAIN within the Token Sale, and,
              if necessary, obtain independent advice in this regard. Any
              interested person who is not in the position to accept nor to
              understand the risks associated with the activity, including the
              risks related to the non-development of Chain Games network and
              operations, or any other risks as indicated in the T&C, should not
              acquire CHAIN, at this stage or later.
              <br />
              <br />
              2. Legal Risk concerning Security Regulation. There is a risk that
              in some jurisdictions CHAIN Utility Tokens might be considered as
              a security, now or in the future. Company does not give warranties
              or guarantees that CHAIN Utility Token are not a security in all
              jurisdictions. Each user of Chain Games shall bear its own legal
              or financial consequences of CHAIN Utility Token being considered
              a security in their respective jurisdiction. The legal ability of
              Company to provide CHAIN Utility Tokens in some jurisdictions may
              be eliminated by future regulation or legal actions. In the event,
              it turns out with a high degree of certainty that CHAIN Utility
              Tokens are not legal in certain jurisdiction, Company will base on
              its sole discretion either (a) cease operations in that
              jurisdiction, or (b) adjust CHAIN Utility Tokens in a way to
              comply with the regulation should that be possible and viable. It
              is your obligation to check if acquisition and disposal of CHAIN
              Utility Tokens is legal in your jurisdiction, and by accepting
              these Terms you expressly agree and warrant that you will not use
              Chain Games should the use not be legal in the relevant
              jurisdiction.
              <br />
              <br />
              3. Risk of malfunction of blockchain. Nobody can guarantee the
              Ethereum source code used by Company will be flaw-free. It may
              contain certain flaws, errors, defects and bugs, which may disable
              some functionality for users, expose users’ information or
              otherwise. Such flaw would compromise the usability and/or
              security of Company and consequently bring adverse impact on the
              value of Company. Open-source codes rely on transparency to
              promote community-sourced identification and solution of problems
              within the code.
              <br />
              <br />
              4. Update of the Source Code. The Ethereum source code could be
              updated, amended, altered or modified from time to time by the
              developers and/or the community of Ethereum. Nobody is able to
              foresee or guarantee the precise result of such update, amendment,
              alteration or modification. As a result, any update, amendment,
              alteration or modification could lead to an unexpected or
              unintended outcome that adversely affects CHAIN Utility Tokens
              and/or Company operation or market value.
              <br />
              <br />
              5. Internet transmission risks. You acknowledge that there are
              risks associated with utilizing Internet-based digital assets,
              products and website including, but not limited to, the failure of
              hardware, software, and Internet connections. You acknowledge that
              the Company shall not be responsible for any communication
              failures, disruptions, errors, distortions or delays you may
              experience when using our services, website, platform, CHAIN
              Utility Tokens howsoever caused.
              <br />
              <br />
              6. Cryptography risks. You acknowledge that there are risks
              associated with cryptography, such as code cracking or technical
              advances such as the development of quantum computers, could
              present risks to all crypto-currencies including CHAIN Utility
              Tokens. This could result in the theft, loss, disappearance,
              destruction or devaluation of Chain Games. To a reasonable extent,
              Company will be prepared to take proactive or remedial steps to
              update the protocol underlying Company in response to any advances
              in cryptography and to incorporate additional reasonable security
              measures where appropriate. It is impossible to predict the future
              of cryptography or the future of security innovations to an extent
              that would permit the Company to accurately guide the development
              of Company to take into account such unforeseeable changes in the
              domains of cryptography or security.
              <br />
              <br />
              7. Splitting and Forking. Ethereum is an open source project and
              supported by the community. The developers of the Company do not
              lead the development, marketing, operation or otherwise of
              Ethereum. Anybody may develop a patch or upgrade of the source
              code of Ethereum’s source without prior authorization of anyone
              else. The acceptance of Ethereum patches or upgrades by a
              significant, but not overwhelming, percentage of the users could
              result in a “split” or “fork” in the blockchain of Ethereum, and
              consequently the operation of two separate networks and will
              remain separate until the split or forked blockchains are merged.
              The temporary or permanent existence of split or forked
              blockchains could adversely impact the operation and the market
              value of Chain Games and in the worst-case scenario, could ruin
              the sustainability of the Company. While such a split or fork in
              the blockchain of Ethereum would possibly be resolved by
              community-led efforts to merge the split or forked blockchains,
              the success is not guaranteed and could take long period of time
              to achieve.
              <br />
              <br />
              8. Risk of unfavorable regulatory action in one or more
              jurisdictions. Blockchain technologies have been the subject of
              scrutiny by various regulatory bodies around the world. Chain
              Games could be impacted by one or more regulatory inquiries or
              actions, including but not limited to restrictions on the use or
              possession of CHAIN, which could impede or limit their existence,
              permissibility of their use and possession, and their value.
              <br />
              <br />
              9. Risk of theft and hacking. Hackers or other groups or
              organizations may attempt to interfere with your third-party
              wallet, the Website or the availability of CHAIN Utility Tokens in
              any number of ways, including without limitation denial of service
              attacks, Sybil attacks, spoofing, smurfing, malware attacks, or
              consensus-based attacks.
              <br />
              <br />
              10. Risk of mining attacks. Ethereum blockchain, which is used for
              the CHAIN Utility Tokens, is susceptible to mining attacks,
              including but not limited to double-spend attacks, majority mining
              power attacks, “selfish-mining” attacks, and race condition
              attacks. Mining Attacks, as described above, may also target other
              blockchain networks, with which Chain Games interacts with. Any
              successful attacks present a risk to the CHAIN Utility Token.
              <br />
              <br />
              11. Risk of loss of value and uninsured losses. Value of CHAIN
              Utility Tokens may fluctuate and you may suffer loss in value of
              such acquired CHAIN Utility Token. In addition to loss of value
              risk, CHAIN Utility Tokens are entirely uninsured and are unlike
              bank accounts or accounts at some other financial institutions.
              <br />
              <br />
              12. Unanticipated risks. Cryptocurrencies and blockchain
              technologies are new and untested technology and in addition to
              the risks outlined in these Terms, there are also unforeseeable
              risks that may materialize as unanticipated.
              <br />
              <br />
              13. You acknowledge, agree and warrant that you have been warned
              of the potential risks involved by using our services, website and
              product and other relevant technologies mentioned herein as well
              as that there may be other risks involved, which are not specified
              herein and that you fully accept such risks.
              <br />
              <br />
              VI. Disclaimer
              <br />
              <br />
              1. The T&C shall not and cannot be considered as an invitation to
              enter into an investment. They do not constitute or relate in any
              way nor should they be considered as an offering of securities in
              any jurisdiction. The T&C do not include or contain any
              information or indication that might be considered as a
              recommendation or that might be used to base any investment
              decision. This document does not constitute an offer or an
              invitation to sell shares, securities or rights belonging to Chain
              Games or any related or associated company. Chain Games will be
              used as an entry ticket and is required to qualify for direct
              access to the CHAIN Utility Token when it will be accessible and
              is not intended to be used as an investment.
              <br />
              <br />
              2. Any information in the T&C is given for general information
              purpose only and Chain Games does not provide with any warranty as
              to the accuracy and completeness of this information.
              <br />
              <br />
              3. The offering of CHAIN Utility Tokens is done in order to allow
              the utilization of software services and not for speculative
              purposes.
              <br />
              <br />
              4. Chain Games is an entity managing the Chain Games platform.
              Chain Games is not a financial intermediary and is not required to
              obtain any authorization for Anti Money Laundering purpose.
              <br />
              <br />
              5. Regulatory authorities are carefully scrutinizing businesses
              and operations associated to cryptocurrencies in the world. In
              that respect, regulatory measures, investigations or actions may
              affect the Chain Games business and even limit or prevent it from
              developing its operations in the future.
              <br />
              <br />
              6. Any person undertaking to acquire CHAIN Utility Token must be
              aware that the Chain Games business model and the T&C may change
              or need to be modified because of new regulatory and compliance
              requirements from any applicable laws in any jurisdictions. In
              such case, any person undertaking to acquire CHAIN acknowledge and
              understand that neither Chain Games nor any of its affiliates
              shall be held liable for any direct or indirect loss or damages
              caused by such changes.
              <br />
              <br />
              7. Chain Games will do its best to launch its operations and
              develop the Chain Games platform. Any person undertaking to
              acquire CHAIN acknowledges and understands that Chain Games does
              not provide any guarantee that it will manage to achieve it.
              <br />
              <br />
              8. Acquiring CHAIN shall not grant any right or influence over the
              Chain Games organization and governance to the users. These tokens
              will be issued by a technical process referred to as a
              «blockchain». This is an open source IT protocol over which the
              Company has no rights or liability in terms of its development and
              operation. The token distribution mechanism will be controlled by
              a Smart Contract; this involves a computer program that can be
              executed on the Ethereum network or on another «blockchain»
              network that is compatible with the Smart Contract programming
              language. User acknowledges and understands therefore that Chain
              Games, including its bodies and employees, assumes no liability or
              responsibility for any loss or damage that would result from or
              relate to the incapacity to use the CHAIN Utility Token expected
              in case of intentional misconduct or gross negligence.
              <br />
              <br />
              9. Chain Games is based on the Ethereum protocol. Therefore, any
              malfunction, unplanned function or unexpected operation of the
              Ethereum protocol may cause the CHAIN Utility Token network to
              malfunction or operate in a way that is not expected.
              <br />
              <br />
              10. Employees of Chain Games are allowed to operate with CHAIN
              Utility Token at market price if they are not in knowledge of
              information that may modify the price of the Token.
              <br />
              <br />
              VII. Eligibility, Representation, and Warranties
              <br />
              <br />
              1. You must be at least 18 years old to use our services, product
              and website. By using our services, products and accessing our
              website you represent and warrant that you: (a) are at least 18
              years old; (b) you have full power and authority to enter into
              this agreement (c) have not been previously suspended or removed
              from using our services (b) have not been placed on any of the
              sanctions lists, published and maintained by the United Nations,
              European Union, any EU country, UK Treasury and US Office of
              Foreign Assets Control (OFAC);
              <br />
              <br />
              2. If you are using the services on behalf of a legal entity, you
              represent and warrant that: (a) such legal entity is duly
              organized and validly existing under the applicable laws of the
              jurisdiction of its organization; (b) you are duly authorized by
              such legal entity to act on its behalf (c) any beneficial owner of
              the legal entity, director, employee, services provider or any
              other individual in any way connected with the Company has not
              been placed on any of the sanctions lists, published and
              maintained by the United Nations, European Union, any EU country,
              UK Treasury and US Office of Foreign Assets Control (OFAC);
              <br />
              <br />
              3. By participating in the Token Sale, the User agrees to the T&C
              and in particular, they represent and warrant that they:
              <br />
              <br />
              A. are authorized and have full power to acquire CHAIN Utility
              Token according to the laws that apply in their jurisdiction of
              domicile;
              <br />
              <br />
              B. are not a citizen, resident or entity of Afghanistan,
              Australia, Belarus, Bosnia & Herzegovina, Burma, Burundi, Central
              African Republic, Cuba, Democratic Republic of Congo, Estonia,
              Egypt, Guinea, Guinea-Bissau, Iran, Iraq, Lebanon, Libya, Mali,
              Moldova, Montenegro, Myanmar (Burma), Nicaragua, North Korea,
              Somalia, Sudan, Syria, Tunisia, Turkey, Ukraine, United States of
              America and its territories (American Samoa, Guam, the Northern
              Mariana Islands, Puerto Rico, and the U.S. Virgin Islands),
              Venezuela, Yemen, and/or Zimbabwe nor are purchasing CHAIN Utility
              Token or signing on behalf of a resident in the jurisdictions
              listed;
              <br />
              <br />
              C. are familiar with all related regulations in the specific
              jurisdiction in which they are based and that purchasing
              cryptographic tokens in that jurisdiction is not prohibited,
              restricted or subject to additional conditions of any kind;
              <br />
              <br />
              D. are not acting for the purpose of speculative investment;
              <br />
              <br />
              E. live in a jurisdiction which allows Chain Games to sell the
              CHAIN Utility Token through a crowd sale without requiring any
              local authorization;
              <br />
              <br />
              F. does not live in a jurisdiction which is qualifying token
              issued through a crowd sale as securities;
              <br />
              <br />
              G. will not use the Token Sale for any illegal activity, including
              but not limited to money laundering and the financing of
              terrorism;
              <br />
              <br />
              H. are solely responsible for determining whether the acquisition
              of CHAIN Utility Token is appropriate for them;
              <br />
              <br />
              I. are acquiring CHAIN Utility Token exclusively for use of the
              Chain Games platform;
              <br />
              <br />
              J. understand the risks associated with the Token Sale, including
              the risks related to the non- development of the Chain Games
              network and operations, and understand the use of cryptocurrencies
              and its associated risks.
              <br />
              <br />
              K. acknowledges and accepts that the CHAIN Utility Token crowd
              sale is taking place within an industry legal environment that is
              still under development, shall not violate or attempt to violate
              the security of the website; services, platform and CHAIN Utility
              Token and you will not hack into, interfere with, disrupt,
              disable, over-burden, modify, publish, reverse engineer,
              participate in the transfer or sale, create derivative works, or
              otherwise impair the website, platform and CHAIN Utility Token.
              <br />
              <br />
              L. acknowledge the Company shall have the right to implement
              necessary measures to monitor compliance of this Section.
              <br />
              <br />
              VIII. Gaming Platform
              <br />
              <br />
              1. User Responsibility. By using the Chain Games gaming platform,
              the User agrees to the T&C and in particular, they represent and
              warrant the following:
              <br />
              <br />
              A. User is solely responsible for confirming and ensuring their
              compliance with any local prohibitions and/or regulations that may
              be applicable to their activities on the website, including those
              of your country or jurisdiction of residence.
              <br />
              <br />
              B. User acknowledges underage gambling is illegal and is
              twenty-one (21) years of age or more, or above the minimum legal
              age of majority in their jurisdiction, whichever is higher. User
              further confirms that they are legally allowed to participate in
              the games and services under the relevant laws in their
              jurisdiction.
              <br />
              <br />
              C. User participation in the games and services is for purposes of
              recreation and entertainment only, and is strictly personal and
              not in any professional capacity.
              <br />
              <br />
              D. User participates in the games and services only on behalf of
              the member himself or herself.
              <br />
              <br />
              E. All information received from the user is true and accurate.
              The user will immediately notify Chain Games of any changes to the
              information provided.
              <br />
              <br />
              F. User is solely responsible for any and all taxes or other
              amounts payable in their resident country or jurisdiction relating
              to any winnings or withdrawals made by the user.
              <br />
              <br />
              G. Member takes on the risk of losing funds by participating in
              the games and services.
              <br />
              <br />
              H. Fraud, collusion, fixing or any other actions which can be
              considered unlawful are strictly forbidden in relation to the
              user’s or any third-party’s participation in the games and
              services. In the event such activities are taking place, Chain
              Games reserves the right to close the member account and
              invalidate any betting.
              <br />
              <br />
              I. User will only use wallet addresses that are valid and legally
              under the user’s custody and control.
              <br />
              <br />
              J. User is solely responsible to keep their login details and
              crypto wallets secure and ensure that they are not disclosed to
              anyone. Chain Games is not responsible for any misuse of wallets.
              <br />
              <br />
              K. User is solely responsible for their own account transactions,
              wagers, bets, and engagement on the platform. User will review and
              confirm wagers and bets for any mistakes before entering the games
              and services. User acknowledges once a transaction is complete it
              cannot be changed.
              <br />
              <br />
              2. Malicious Use. Users shall not perform any of the following
              acts in connection with the use of the services provided by the
              company:
              <br />
              <br />
              A. When applying for use or changing member information, use other
              person's information or enter false information;
              <br />
              <br />
              B. The act of impersonating executives, employees, operators, and
              other related parties of the company;
              <br />
              <br />
              C. Changing the information posted by the company;
              <br />
              <br />
              D. Unauthorized collection, storage, posting, or dissemination of
              other users’ personal information;
              <br />
              <br />
              E. The act of producing, distributing, using, or advertising
              computer programs or devices or devices not provided or approved
              by the company;
              <br />
              <br />
              F. Intentionally sending, posting, distributing or using viruses,
              computer codes, files, programs, etc. designed to interfere with
              or destruct normal operation of information, computer programs, or
              computer software/hardware or regular communications equipment;
              <br />
              <br />
              G. Changing game services, adding or inserting other programs into
              game services, hacking, reverse-engineering servers, leaking or
              changing source code or data, establishing separate servers, or
              arbitrarily changing or stealing parts of the website without
              being granted special rights by the company;
              <br />
              <br />
              H. The act of using game services for sales, advertising, public
              relations, political activities, election campaigns, etc. without
              the consent of the company;
              <br />
              <br />
              I. Unauthorized reproduction, distribution, promotion, or
              commercial use of information obtained using the company's
              services, and the use of services by exploiting known or unknown
              bugs;
              <br />
              <br />
              J. The act of profiting from harming others in connection with the
              use of the company's services;
              <br />
              <br />
              K. Violating the intellectual property or portrait rights of the
              company or others, defaming or damaging others;
              <br />
              <br />
              L. Other acts contrary to good customs and other social norms; or
              <br />
              <br />
              M. Using the service using an automatic script.
              <br />
              <br />
              3. Legal Compliance. You are subject to, and are solely
              responsible for obeying all laws of the state, province and/or
              country in which You reside and from which You access the Site,
              Log-In to the Site or participate in any game service. You agree
              to only participate in the game services only after You have
              determined in good-faith that You are in compliance with state,
              local and other governing laws and regulations.
              <br />
              <br />
              Participation within the United States of America (U.S.)
              <br />
              <br />
              Participation in fee-based tournaments for prizes is prohibited in
              the following U.S. states, without limitation: Arizona. The
              foregoing list shall not be construed to imply or suggest that
              Your participation in game services from an unlisted state is
              legal under any applicable laws or regulations. VOID WHERE
              PROHIBITED OR RESTRICTED BY LAW.
              <br />
              <br />
              Participation outside the U.S. Participation in fee-based
              tournaments for prizes may be prohibited in Your jurisdiction and
              it is Your sole responsibility to ensure compliance with such
              laws. VOID WHERE PROHIBITED OR RESTRICTED BY LAW.
              <br />
              <br />
              You agree to hold Us harmless from any liability such that We
              cannot be held liable if laws applicable to You restrict or
              prohibit Your participation in any game service or contests
              arranged and established through the Platform or otherwise. We
              make no representations or warranties, implicit or explicit, as to
              Your legal right to participate in any game service facilitated
              nor shall any person affiliated, or claiming affiliation with Us,
              have authority to make such representations or warranties.
              <br />
              <br />
              4. Refunds and Payouts. Under no circumstances will the CHAIN
              Utility Token be refunded. The company will not refund CHAIN
              Utility Token losses incurred due to user negligence and lack of
              knowledge of service usage of the service. CHAIN Utility Token
              payouts are automatically distributed through smart contracts. The
              company is not responsible for any payment delays caused by
              delayed transactions on the blockchain network.
              <br />
              <br />
              5. Change of Service. Users may use the game service provided by
              the company in accordance with these terms of services, policies,
              and game rules established by the company. The contents that the
              company provides to its users through game services have
              comprehensive authority over the production, modification,
              maintenance and repair of the contents according to the company's
              needs. Chain Games can change the service according to operational
              or technical needs to provide smooth game services at the
              company’s discretion.
              <br />
              <br />
              6. Collection of Information. Chain Games will be storing the
              contents and records of games and services on the platform. This
              information will be shared with the user community through
              leaderboards and statistical information. The company can collect
              and utilize the user’s device information (setup, specification,
              operating system, version, etc.) for smooth and stable operation
              of the service and improvement of the service quality. Chain Games
              may request additional information from the users for the purpose
              of improving the service and introducing services to users. The
              company has the right to check the service use of the user at any
              time. If the user's malicious use is identified during such
              verification, the service can be restricted or the account in use
              can be closed.
              <br />
              <br />
              7. Advertisements. Chain Games may place advertisements within the
              game service and platform. Advertisement information can also be
              sent by e-mail, text message service (LMS/SMS), push notification,
              etc. only to users who agree to receive advertisement information.
              The user may refuse to receive the advertisement information at
              any time.
              <br />
              <br />
              IX. Intellectual Property Rights
              <br />
              <br />
              1. To the extent that copyright or other intellectual property
              rights exist on the Chain Games platform, website, CHAIN Utility
              Token and services such as software, know-how, analysis or
              programs, those copyrights and other intellectual and industrial
              rights belong to Chain Games or third-party affiliates. Under no
              circumstances will these Terms be construed as granting, by
              implication, estoppel or otherwise, a license to any Intellectual
              Property or components thereof other than as specifically granted
              in these terms. You agree that the Intellectual Property may be
              used only as provided in these terms. All rights not expressly
              granted herein are reserved.
              <br />
              <br />
              X. Disclaimer of Warranties
              <br />
              <br />
              1. To the fullest extent permissible under applicable law, our
              service, website, CHAIN Utility Tokens are provided on an “as is,”
              and “as available” basis, without warranties of any kind, express,
              implied or statutory, including implied warranties of condition,
              uninterrupted use, merchantability, satisfactory quality, fitness
              for a particular purpose, non-infringement of third-party rights,
              and warranties (if any) arising from a course of dealing, usage,
              or trade practice, is given in conjunction to website, services,
              platform, CHAIN Utility Token, any software or product contained
              in website, CHAIN Utility Token and services and in general.
              <br />
              <br />
              2. Company does not warrant that the service, CHAIN token or
              website will be error-free or uninterrupted or that any defects
              will be corrected in reasonable time. You acknowledge that your
              use of the service, platform and website is at your sole risk.
              <br />
              <br />
              3. While every effort is made to ensure that information contained
              in the website or Chain Games is correct, Company disclaims all
              warranties regarding the accuracy, adequacy, correctness,
              completeness, reliability, timeliness, non-infringement, title,
              merchantability or fitness of any information on the Website
              and/or Chain Games.
              <br />
              <br />
              4. Company does not guarantee the confidentiality or privacy of
              any communication or information transmitted through services, on
              the Website or Chain Games or any site linked to the website. We
              will not be liable for the privacy or security of information,
              e-mail addresses, registration and any identification information
              (if applicable), disk space, communications, confidential or
              proprietary information, or any other content transmitted to us in
              any manner, or otherwise connected with your use of our services,
              website or platform.
              <br />
              <br />
              5. Company shall not bear any liability, whatsoever, for any
              damage or interruptions caused by any computer viruses, spyware,
              scareware, trojan horses, worms or other malware that may affect
              your computer or other equipment, or any phishing, spoofing or
              other attack. We advise the regular use of a reputable and readily
              available virus screening and prevention software. You should also
              be aware that communication services are vulnerable to spoofing
              and phishing attacks and should use care in reviewing messages
              purporting to originate from the Company and/or users on the
              platform. If you have any uncertainty regarding the authenticity
              of any communication or notice, please contact
              support@chaingames.io and notify the Chain Games team.
              <br />
              <br />
              XI. Limitation of Liability
              <br />
              <br />
              1. Chain Games, as well as its officers, directors, agents, joint
              ventures, employees, suppliers and advisors, assumes no liability
              or responsibility for any loss raised from the token sale, arising
              out of or related to the use of the Chain Games platform or any
              technical, interruption or malfunction of the Chain Games
              platform, website, token, services or otherwise. In no event shall
              Chain Games, as well as its officers, directors, agents, joint
              ventures, employees, suppliers and advisors, be liable for any
              special, indirect, incidental, punitive or consequential damages
              of any kind whatsoever, including without limitation any damages
              caused by or resuming from reliance by any user or any information
              obtained from the Company, or that result from mistakes,
              omissions, interruptions, deletion of files or email, errors,
              defects, viruses, delays in operation or transmission or any
              failure of performance, whether or not resulting from a force
              majeure event, suspension of Ethereum network communication
              failure, theft, destruction or unauthorized access to company’s
              records, services, website, CHAIN Utility Token. In addition to
              the above, company shall not be liable for any loss of profit,
              loss of business, trading losses, loss in value, or any other
              loss. This applies even if such damages are foreseeable.
              <br />
              <br />
              2. The limitation of liability set out above shall not be
              applicable in the event that Chain Games, or a Chain Games
              employee, has caused the damage by intentional misconduct or by
              gross negligence.
              <br />
              <br />
              3. Each party acknowledges that the fees payable hereunder
              reflects the allocation of risk set forth in the agreement and
              that each party would not enter into the agreement without these
              limitations on liability.
              <br />
              <br />
              XII. Indemnification
              <br />
              <br />
              1. You will defend, indemnify and hold Company, its affiliates and
              licensors and its officers, directors, contractors, employees,
              agents and representatives, harmless from and against all claims,
              actions, demands, liabilities, damages, losses, costs and expenses
              (including legal fees) relating to or arising from (a) your use of
              our services, website, platform, CHAIN Utility Token (b) your
              breach of these terms or any other liabilities arising out of your
              use of the services, website and product or the use by any other
              person accessing the website, service, platform, CHAIN Utility
              Token using your computer and/or your personal information (c)
              your violation of any rights of any other person or entity in
              connection with these terms (d) third-party claims concerning
              these terms or you thereof. You will promptly notify us of any
              third-party claims, actions, or proceedings which you become aware
              of that involves company as a result of these terms. Company may
              participate with counsel of its own choosing in any proceedings
              describing above. Company will be required to respond to
              compulsory legal order, you will reimburse company for reasonable
              attorney and contractors fees for their time and material spent
              responding to obligatory legal orders. You will not agree to any
              settlement which imposes any obligation or liability for company
              without company’s prior written consent.
              <br />
              <br />
              XIII. Links to other Websites
              <br />
              <br />
              1. Our services, website, platform, CHAIN Utility Token may
              include links to third party websites, third party wallet
              providers or other service providers (“Third Party Sites”). If you
              use any links made available through our services, website,
              platform, application to reach other websites not maintained by
              the company you will leave our services, website, platform,
              application. The linked sites are not under the control of the
              company and company is not responsible for the content of any
              linked site or any link contained in a linked site. The linked
              sites are governed by the terms and conditions of that site.
              <br />
              <br />
              2. Company shall not be responsible or liable, either directly or
              indirectly, for any damage or loss caused or alleged to be caused
              in connection with your use or reliance on any such content,
              information, statements, representations, advertising, products,
              services or other materials available on or through third party
              sites. Company provides these links to you only as a convenience
              and the inclusion of any link does not imply recommendation,
              approval or endorsement by company of third-party sites, nor does
              it imply that the linked third-party sites recommends, approves
              of, or endorses Company.
              <br />
              <br />
              XIV. Feedback
              <br />
              <br />
              1. In connection with your use of our services, website, platform,
              you may provide us with your feedback (suggestions, ideas,
              reviews, comments, material and questions or other information
              and/or material). We will own exclusive rights, including all
              intellectual property rights, to any feedback, suggestions, ideas
              or other information or materials you provide to us, whether by
              email, posting through our services, website, platform or
              otherwise. You waive any rights you may have to the feedback
              (including any copyrights to the extent permitted by law). And
              Feedback you provide to us is non-confidential, non-proprietary
              and is not subject to a third-party license and we have no
              liability for any loss or damage suffered by you as a result of
              the disclosure or use of such feedback. We have the right to
              disclose your identity to any third-party who is claiming that any
              content posted by you constitutes a violation of their
              intellectual property rights, or of their right to privacy. We
              have the right to remove any posting you make on our website if,
              in our opinion, your post does not comply with the content
              standards set out in this section.
              <br />
              <br />
              XV. Term and Termination
              <br />
              <br />
              This agreement is entered into for unlimited duration. We reserve
              the right to terminate and/or suspend your access to our
              services/website, without giving you prior written notice and
              delete all related information and files related to your use of
              our services, website, platform, mobile application, without
              liability to you, at any time for any reason, including, but not
              limited to, if based on our sole discretion believe: (i) You have
              violated these Terms, (ii) You create risk or possible legal
              exposure for us.
              <br />
              <br />
              XVI. Notices
              <br />
              <br />
              1. You agree and consent to receive electronically all
              communications, agreements, documents, receipts, notices and
              disclosures (collectively, Communications”) that Company provides
              in connection with your use of Company Services, Website, Platform
              and mobile application. You acknowledge and agree that Company may
              provide these communications to you by posting them on its Website
              or by emailing them to you at the email address you provide. Any
              email communication will be considered to be received by you
              within 24 hours after we email it to you and Communication via our
              Website will be effective upon posting. You should maintain copies
              of electronic Communications by printing a paper copy or saving an
              electronic copy.
              <br />
              <br />
              2. It is your responsibility to keep your email address with the
              Company up to date so that the Company can communicate with you
              electronically. You understand and agree that if the Company sends
              you an electronic communication but you do not receive it because
              your email address is incorrect, out of date, blocked by your
              service provider, or you are otherwise unable to receive
              electronic communications, Company will be deemed to have provided
              the communication to you. Please note that if you use a spam
              filter that blocks or re-routes emails from senders not listed in
              your email address book, you must add the Company to your email
              address book so that you will be able to receive the
              communications we send to you. You can update your information at
              any time by sending such information to: info@chaingames.io. You
              may also contact us by sending an email to info@chaingames.io with
              general questions or support@chaingames.io for assistance. All
              legal notices, including legal disputes, must be sent in writing
              to the following address: legal@chaingames.io or postage prepaid
              by certified or registered mail, return receipt requested and
              addressed to the authorized representative of the relevant Party.
              All given notices must be in English language.
              <br />
              <br />
              XVII. Taxes
              <br />
              <br />
              1. You are solely responsible and liable to declare, bear and pay
              all taxes, duties, imposts, levies, tariffs and surcharges that
              might be imposed by the laws and regulations of any jurisdiction
              as a result of or in connection with the use of services, website,
              platform, CHAIN Utility Token or any other Company product.
              Company is not giving any advice regarding tax issues and is not
              responsible for determining any tax implications connected with
              its Services, Website, Platform, and the CHAIN Utility Token.
              Company makes no representation as to the tax implication of any
              jurisdiction. You shall be solely liable for all such penalties,
              claims, fines, punishments, liabilities or otherwise arising from
              his/her underpayment, undue payment or belated payment of any
              applicable tax.
              <br />
              <br />
              2. All fees and charges payable by you to Company are exclusive of
              any taxes and if certain taxes shall be applicable, they shall be
              added on top of applicable amount. Upon our request, you will
              provide us any information we reasonably request to determine
              whether we are obligated to collect VAT from you, including your
              VAT identification number. If any deduction or withholding is
              required by law, you will notify us and will pay us any additional
              amounts necessary to ensure that the net amount that we receive,
              after any deduction and withholding, equals the amount we would
              have received if no deduction or withholding had been required.
              Additionally, you will provide us with documentation showing that
              the withheld and deducted amounts have been paid to the relevant
              taxing authority.
              <br />
              <br />
              XVIII. Severability
              <br />
              <br />
              1. If any of the provisions of the T&C or of the Agreement are
              deemed to be invalid, void or unenforceable, the remaining
              provisions shall continue in full force and effect.
              <br />
              <br />
              XIX. Applicable Law and Jurisdiction
              <br />
              <br />
              1. The T&C are subject to and governed by Estonian Law. Any User
              of Chain Games agree to seek an amicable settlement prior to
              bringing any legal action. All disputes arising from or under
              these T&C shall be resolved by arbitration in accordance with The
              Court of Arbitration of the Estonian Chamber of Commerce and
              Industry on the date when the Notice of Arbitration is submitted
              in accordance with these Rules. The arbitration panel shall
              consist of one arbitrator only. The seat of the arbitration shall
              be Tallin, Estonia. The arbitral proceedings shall be conducted in
              English.
              <br />
              <br />
              XX. Privacy
              <br />
              <br />
              1. User Blockchain Wallets. The company classifies users through
              the user-connected Blockchain wallet address for the convenience
              of the users’ information protection and service information, and
              performs all the user management tasks in the service. The user
              shall manage his or her blockchain wallet address with his or her
              duty. The company shall not take any responsibility for damages
              caused by neglecting the information of the blockchain wallet or
              accepting the use of the information to a third-party, and all
              responsibilities shall be borne by the user. The company may
              refuse to use a blockchain wallet that is restricted to use.
              <br />
              <br />
              1. Security measures. We protect your information using physical,
              technical, and administrative security measures to reduce the
              risks of loss, misuse, unauthorized access, disclosure, and
              alteration. Some of the safeguards we use are firewalls and data
              encryption, physical access controls to our data centers, and
              information access authorization controls. We also authorize
              access to personal information only for those employees who
              require it to fulfill their job responsibilities.
              <br />
              <br />
              2. Usage and sharing. We use personal information to provide our
              services and products, for administering our business activities,
              to communicate with you, to promote safety and security (we use
              personal information for loss prevention, anti- fraud and/or
              unauthorized activity and to enforce these terms) and to provide
              you with customer service, technical support, for audit purposes,
              to prevent and investigate potentially prohibited or illegal
              activates and to notify you about improvements to our website and
              new services we think you will find useful. We can use personal
              information so as to mitigate the risk of fraud, identity theft or
              credit card theft. We may use your name and email address to
              provide you with information about products or services that may
              be of interest to you. You may ask us to delete your personal
              information at any time by emailing us at: info@chaingames.io. We
              may also create anonymous, aggregated and/or other de-identified
              data records (“anonymous Information”) from information that you
              provide to us by excluding information that makes the information
              personally identifiable to you. We use this anonymous information
              to analyze request and usage patterns so that we may enhance the
              content of our services and to improve site navigation. We reserve
              the right to use anonymous information for any purpose and to
              disclose such data to third parties in our discretion.
              <br />
              <br />
              3. Sharing of personal data. We take your privacy very seriously,
              and will only share your personal information as needed with the
              entities within the ecosystem to perform the services and in the
              event if we are legally to meet any legal, regulatory, or
              governmental request, including but not limited to events when we
              are compelled to do so by a subpoena, court order, or similar
              legal procedure.
              <br />
              <br />
              XXI. Miscellaneous
              <br />
              <br />
              1. Entire Agreement. These terms represent the entire agreement,
              and supersede all prior and contemporaneous understandings between
              you and the Company regarding the subject matter, especially
              regarding the services, website, platform and CHAIN Utility Token.
              In the event of any conflict between these terms and any other
              agreement you may have with the Company, the terms of that other
              agreement will prevail only if these terms are specifically
              identified and declared to be overridden by such other agreement.
              <br />
              <br />
              2. Assignment. These Term shall be binding upon and inure to the
              benefit of the parties and their permitted successors and assigns.
              You may not assign or transfer any of your rights or obligations
              under these Terms without Company’s prior written consent from,
              including by operation of law or in connection with any change of
              control. Company may assign or transfer any or all of its rights
              under these Terms, in whole or in part, without obtaining your
              prior written consent or approval.
              <br />
              <br />
              3. Act of God Events. Company shall not be liable for (1) any
              inaccuracy, error, delays or omission of (i) any information, or
              (ii) the transmission or delivery of information; (2) any loss or
              damage arising from flood, extraordinary weather conditions,
              earthquake, or other act of God, fire, war, insurrection, riot,
              labor dispute, accident, action of government, communications,
              power failure, or equipment or software malfunction or any other
              cause beyond Company’s reasonable control, also known as “Force
              Majeure Event”.
              <br />
              <br />
              4. Waiver. Company failure or delay in exercising any right, power
              or privilege under these Terms shall not operate as a waiver
              thereof.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
